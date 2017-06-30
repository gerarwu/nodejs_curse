var express = require('express');
var crypto = require('crypto');
var router = express.Router();

const collection = "usuarios";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next)=>{

  let autenticado = req.session.autenticado;

  if(!autenticado){

    let nombre = req.body.nombre;
    let password = req.body.password;

    if(!nombre || !password){
      res.status(301).send("request malformado")      
    }
    let db = req.app.get("db");
    let stream = db.collection(collection).find({ nombre : nombre , password : crypto.createHash("sha256").upadte(password, 'utf8').digest() });
    let resultado = null;

    stream.on('data', (d)=> {
      resultado = d;
    });

    stream.on('end', ()=>{
      if(resultado != null){        
        req.session.autenticado = true;
        res.send("Estas autenticado");
      }else{
        req.session.autenticado = false;
        res.send("Usuario o password incorrecto");
      }
    });

  }else{
    //req.session.autenticado = true;
    res.send("usted ya esta autenticado");
  }

});


/* GET consular un usuario */
router.get('/:nombre', (req, res, next)=>{

    let db = req.app.get('db');

    let cursor = db.collection(collection).find({ nombre : req.params.nombre});

    let result ;

    cursor.on('data', (d)=>{
      result = d;
    });

    cursor.on('end', ()=>{
      res.send(result);
    });
});

/* POST registro de usuarios {nombre : string, email : string , password : string } */ 

router.post("/", (req, res, next) => {

  let db = req.app.get('db');
  let usuario = req.body;
  
  if( validaRegistro(usuario) ){


    usuario.password = crypto.createHash("sha256").upadte(usuario.password, 'utf8').digest();

    db.collection(collection).insertOne(usuario, (err, result)=>{
      res.send(result);
    });

  }else{

    res.status(403).send("peticion malformada");

  } 

});

function validaRegistro(usuario){

  if((usuario == undefined) || (usuario == null)){
    return false;
  }

  if(!usuario.nombre){
    return false;
  }

  if(!usuario.email){
    return false;
  }

  if(!usuario.password){
    return false;
  }

  return true;
}

module.exports = router;
