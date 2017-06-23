const fs = require("fs");
const readable = fs.createReadStream('./bio.txt');

readable.on('data', (chunk)=>{

    console.log(`Recibiendo ${chunk.length} bytes de datos`);
    readable.pause();
    console.log("En espera de los siguientes datos");
    setTimeout(()=>{
        console.log('Comienza el flujo de datos nuevamente', new Date());
        readable.resume();
    }, 1000);
});

readable.on('end', () => console.log("Termino la lectura del documento") );

readable.on('close', () => console.log("Cenrrando el canal de comunicación"));