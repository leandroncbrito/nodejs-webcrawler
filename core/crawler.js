'use strict';

var request = require('request');
var cheerio = require('cheerio');
var Lojas = require('../lojas/lojas.js');
var B2W = require('../lojas/b2w.js');
var QuedaDePreco = require('../model/quedaDePreco.js');
var Email = require('../util/email.js');
var config = require('../settings.json');

const paginas = config.pages;
const precobase = config.price;

var interval = config.minutes * 60 * 1000;

function ProcessarProdutoGerarMensagem(produto, enviaremail) {
    
    let quedaDePreco = new QuedaDePreco();

    quedaDePreco.precoMenor = VerificarPreco(produto.valores.preco);
    quedaDePreco.boletoMenor = VerificarPreco(produto.valores.boleto);
    quedaDePreco.cartaoLojaMenor = VerificarPreco(produto.valores.cartaoLoja);

    if (quedaDePreco.precoMenor || quedaDePreco.boletoMenor || quedaDePreco.cartaoLojaMenor) {

        console.log('Baixou o preço!\n-----------------------------------------------------------------\n');

        if (enviaremail) {

            let mensagem = Email.gerarEmail(produto, quedaDePreco);

            Email.enviar(mensagem).then(function () {
                process.exit(1);
            });

        }
    }

}

function VerificarPreco(precoDoSite, descricao) {
    return (precoDoSite > 0 && precoDoSite < precobase);
}


module.exports = {

    buscarDados: function (enviaremail) {

        for (var index = 0; index < paginas.length; index++) {

            let pagina = paginas[index];

            request(pagina, function (error, response, body) {

                if (error) {
                    console.log("Erro: " + error);
                }

                if (response.statusCode === 200) {

                    // Parse the document body
                    var $ = cheerio.load(body);

                    let lojas = new Lojas();
                    let produto = lojas.buscarDados(new B2W(), $);

                    produto.link = pagina;

                    ProcessarProdutoGerarMensagem(produto, enviaremail);

                }
            });
        }
    }
}