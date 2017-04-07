var crawler = require('./crawler.js');
var config = require('./settings.json');

var interval = config.minutes * 10000;

function iniciar(enviaremail) {

    crawler.buscarDados(enviaremail);
    
    // setInterval(function () {
    //      crawler.buscarDados(enviaremail)
    // }, interval);
}

iniciar(false);