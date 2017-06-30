var express = require('express');
var validator = require('validator');
var router = express.Router();

function validarSesionActiva(req, res, next){

    let autenticado = req.session.autenticado;

    if(autenticado == true){
        next();
    }else{
        res.status(401).send("Necesitas iniciar sesion para consultar este recurso");
    }
}

router.use(validarSesionActiva);

router.get('/', (req, res, next)=>{

    res.send("dentro de carrito");

})

module.exports = router;
