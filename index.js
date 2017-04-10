'use strict';

var dotenv = require('dotenv');
var crawler = require('./core/crawler.js');
var config = require('./settings.json');

dotenv.load();

var interval = config.minutes * 60 * 1000;

function iniciar(enviaremail) {

    crawler.buscarDados(enviaremail);
    
    setInterval(function () {
         crawler.buscarDados(enviaremail)
    }, interval);
}

iniciar(true);