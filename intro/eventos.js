var Events = require("events");


class Corredor extends Events {

    constructor( nombre ){
        
        super();
        this.nombre = nombre
        this.km = 0;        
    }

    iniciar(){
        
        console.log(" ::: Inicia la carrera :::");      
        
        setInterval(()=>{
            this.km += 1;
            this.emit('kilometro', this.nombre, this.km);
        }, 2000 );
        

    }    

}

var kipchoge = new Corredor('kipchoge');

kipchoge.on("kilometro", (  n, k )=>{
    console.log(n, "Se encuentra en el kilometro ", k);
});

kipchoge.iniciar();