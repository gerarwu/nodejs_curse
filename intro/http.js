var https = require('https');

var req = {
    port : 443,
    hostname : 'api.github.com',
    method : 'get',
    path : 'https://api.github.com/'
};

var request = https.request(req, (response) => {

    response.on('data', (chunk) => {
        console.log(chunk.toString());
    });

    response.on('end', ()=> {
       console.log(response.headers);
    });

});

request.end(); // es un canal tipo WriteStream que lanza la comunicacion del request.