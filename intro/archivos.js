const fs = require('fs');

// ejemplo : Para leer un archivo de manera asincrona de forma exitosa
fs.readFile('./bio.txt', (err, data)=>  console.log(data.toString()) );

// ejemplo error : Para leear un archivo de manera asincrona que tendra un error al tratar de leerlo
fs.readFile('./bioError.txt', (err, dta)=>{
    if(err){
        console.log(err);
    }
})


