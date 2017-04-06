var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var pageToVisit = "https://www.submarino.com.br/produto/130836199/game-horizon-zero-dawn-ps4?condition=NEW";
//var pageToVisit = "https://secure.tibia.com/community/?subtopic=highscores&world=Honera&list=experience&profession=&currentpage=1";

console.log("Visiting page " + pageToVisit);

request(pageToVisit, function (error, response, body) {

    if (error) {
        console.log("Error: " + error);
    }
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);

    if (response.statusCode === 200) {

        // Parse the document body
        var $ = cheerio.load(body);
        
        // Preço a vista
        console.log($('html > body .main-price > .sales-price').text());
        
        // Cartão de credito
        //console.log($('html > body .payment-option-price').text());
    }
});