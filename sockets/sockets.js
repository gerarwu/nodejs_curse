var net = require("net");
var Users = [];

User = function () {
    this.username = null;
    this.conectado = null;
    this.socket = null;
}

var serv = net.createServer((socket)=>{

    socket.write("Escribe tu nombre de usuario");
    var u = new User();
    u.socket = socket;

    socket.on('data', (d)=>{
        
        if(u.username == null){
            u.username = d;
            Users.push(u);
        }else{

            Users.forEach(function(user) {
                user.socket.write( u.username + " : "+ d );
            });
        }

    });

    socket.on('close', ()=>{
        console.log("El usuario " + u.username + " se fue ");
        Users = Users.filter( (user) => u.username != user.username  );
        Users.forEach( (user) => user.socket.write( u.username + " Se fue del chat ") );
    })

});

serv.listen(2000);