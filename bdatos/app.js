var cliente = require('mongodb').MongoClient;

var url = 'mongodb://mongodb@127.0.0.1:9056/mibase';

cliente.connect(url, (err, db)=>{
    db.collection('mascotas')
        .insertOne({
            nombre : 'Rocky',
            especie : 'Perro'
        }, (err, result)=>{
            db.collection('mascotas')
            .findOne((err, result)=>{
                console.log(result);
                db.close();
            });
        });
})