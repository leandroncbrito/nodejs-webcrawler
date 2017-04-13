'use strict';

const dotenv = require('dotenv');
const crawler = require('./core/crawler.js');
const config = require('./settings.json');

dotenv.load();

let intervalo = config.minutes * 60 * 1000;

function iniciar(enviaremail) {

    crawler.buscarDados(enviaremail);
    
    setInterval(function () {
         crawler.buscarDados(enviaremail)
    }, intervalo);
    
}

iniciar(true);