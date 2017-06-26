class Cliente {

    constructor(host, port, protocol){
        
        if(protocol != "https" && protocol != "http"){
            console.log("Error en definicion de protocolo HTTP");
        }

        this.host = host;
        this.port = port;
        this.protocol = protocol;
    }

    autenticatorBasic(user , pass){
        this.basicAuth = new Buffer(user+":"+pass).toString("base64");        
    }

    headersProcesing(){
        var headers =  {
            'Accept' : '*/*',
            'User-Agent' : 'Client Node.js'
        };

        if(this.basicAuth != undefined){
            headers.Authorization = "Basic "+ this.basicAuth;
        }

        return headers;
    }

    get(uri, callback){

        var options = {
            hostname : this.host,
            port : this.port,
            method : 'GET',
            path : this.protocol + "://" + this.host + uri,
            headers : this.headersProcesing()
        };
        this.request(options, null, callback);
    }

    post(uri, data, callback){

        var options = {
            hostname : this.host,
            port : this.port,
            method : 'POST',
            path : this.protocol + "://" + this.host + uri,
            headers : this.headersProcesing()
        };

        this.request(options, data, callback);

    }

    request(options, data, callback){

        var http = require(this.protocol); //http | https

        var response = {
            status : null,
            body : "",
            headers : null
        }

        var req = http.request(options, (responseStream)=>{

            responseStream.on('data', (chunk)=>{
                response.body += chunk;
            });

            responseStream.on('end', ()=>{
                response.status = responseStream.statusCode;
                response.headers = responseStream.headers;
                callback(response);
            });

        });

        if(data != undefined && data != null){
            req.write( JSON.stringify(data) );
        }

        req.end();

    }

}

module.exports = Cliente;