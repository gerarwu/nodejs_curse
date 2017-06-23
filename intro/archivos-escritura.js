const fs = require("fs");

/**
 * canal de escritura
 * Se pueden configurar opciones para modificar el comportamineto del canal, ver documentación oficial completa para más detalles
 * */
const archivo  = fs.createWriteStream('escritura.txt', {
    flags : 'r+',
    start : 5
}); 

archivo.write(` -- Nueva cade de texto  ${new Date()} --` );
archivo.end();




