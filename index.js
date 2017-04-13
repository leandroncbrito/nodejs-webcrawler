'use strict';

const dotenv = require('dotenv');
const crawler = require('./app/core/crawler.js');
const config = require('./config/settings.json');

dotenv.load();

let intervalo = config.minutes * 60 * 1000;

function iniciar(enviaremail) {

    crawler.buscarDados(enviaremail);
    
    setInterval(function () {
         crawler.buscarDados(enviaremail)
    }, intervalo);
    
}

iniciar(true);