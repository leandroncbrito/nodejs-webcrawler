var dotenv = require('dotenv');
var crawler = require('./core/crawler.js');
var config = require('./settings.json');

dotenv.load();

console.log(process.env);
process.exit(1);

var interval = config.minutes * 10000;

function iniciar(enviaremail) {

    crawler.buscarDados(enviaremail);
    
    setInterval(function () {
         crawler.buscarDados(enviaremail)
    }, interval);
}

iniciar(true);