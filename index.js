'use strict';

const http = require('http');
const dotenv = require('dotenv');
const crawler = require('./app/core/crawler.js');
const config = require('./config/settings.json');

dotenv.load();

let intervalo = config.minutes * 60 * 1000;
let ping = 10 * 60 * 1000;

http.createServer(function (req, res) {
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Executando NodeJs WebCrawler!');

}).listen(process.env.PORT || 8080);

function iniciar(enviaremail) {

    console.log("Iniciando crawler...");

    setInterval(function () {
        http.get(process.env.HOST, function() { 
          var data = new Date();
          console.log("Ping " + new Date().toLocaleString());
        });
    }, ping);
    
    setInterval(function () {
         crawler.buscarDados(enviaremail)
    }, intervalo);

}

iniciar(true);
