var Cliente = require('./cliente.js');

var clienteGithub = new Cliente('api.github.com', '443', 'https');

clienteGithub.autenticatorBasic("user", "pass");

clienteGithub.get("/users/gerarwu", (respsonse)=>{
    console.log(respsonse);
});

clienteGithub.post('/repos/gerarwu/nodejs_curse/issues/1/comments', {
    "body":"prueba de servicio post"
}, (response)=> {
    console.log(response);
})