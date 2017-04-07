var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var email = require('./email.js');

var pagina = "https://www.submarino.com.br/produto/130836199/game-horizon-zero-dawn-ps4";
var precobase = 20000;

console.log("Página: " + pagina);

request(pagina, function (error, response, body) {

    if (error) {
        console.log("Erro: " + error);
    }

    if (response.statusCode === 200) {

        // Parse the document body
        var $ = cheerio.load(body);

        let nome = $('html > body .product-name').text();
        let preco = $('html > body .main-price > .sales-price').text();
        let boleto = $('html > body .payment-option-price').eq(0).text();
        let cartao = $('html > body .payment-option-price').eq(1).text();

        let precoNumero = parseFloat(preco.replace(/\D/g, ''));
        let boletoNumero = parseFloat(boleto.replace(/\D/g, ''));
        let cartaoNumero = parseFloat(cartao.replace(/\D/g, ''));

        console.log('Preço: ' + preco);
        console.log('Boleto bancário: ' + boleto);
        console.log('Cartão de crédito: ' + cartao);

        let baixou = 0;
        let mensagem = '<strong>' + nome + '</strong><br><br>';

        if (boletoNumero < precobase) {
            baixou++;
            mensagem += boleto + ' no boleto<br>';
        }

        if (precoNumero < precobase) {
            baixou++;
            mensagem += preco + ' no cartão<br>';
        }

        if (cartaoNumero < precobase) {
            baixou++;
            mensagem += cartao + ' no cartão da loja';
        }

        if (baixou > 0) {
            mensagem += '<br><br><strong><a href="' + pagina + '">LINK PARA O PRODUTO</a></strong>';
            console.log(mensagem);
            email.enviar(mensagem);
        }

    }
});