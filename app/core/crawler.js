'use strict';

const request = require('request');
const cheerio = require('cheerio');
const GoogleShopping = require('../lojas/googleShopping.js');
const QuedaDePreco = require('../model/quedaDePreco.js');
const Email = require('../../util/email.js');
const config = require('../../config/settings.json');
const common = require('../../util/common.js');


const pagina = config.page;
const precobase = config.price;

const ProcessarProdutoEnviarEmail = (produto, enviaremail) => {

    let quedaDePreco = new QuedaDePreco();

    quedaDePreco.precoMenor = VerificarPreco(common.converterParaDecimal(produto.preco));

    if (quedaDePreco.precoMenor) {

        console.log('\nBaixou o preço!\n-----------------------------------------------------------------\n');

        if (enviaremail) {

            let mensagem = Email.gerarEmail(produto, quedaDePreco);

            //console.log(mensagem);
            Email.enviar(mensagem).then(function () {
                process.exit(1);
            });

        }
    }
}

const VerificarPreco = (precoDoSite) => {    
    return (precoDoSite > 0 && precoDoSite < precobase);
}

module.exports = {

    buscarDados: (enviaremail) => {

        request(pagina, function (error, response, body) {

            if (error) {
                console.log("Erro: " + error);
            }

            if (response.statusCode === 200) {

                // Parse the document body
                let $ = cheerio.load(body);

                let googleShop = new GoogleShopping();
                let produtos = googleShop.buscarDados($);

                for (let index = 0; index < produtos.length; index++) {
                    ProcessarProdutoEnviarEmail(produtos[index], enviaremail);
                }
            }
        });
    }
}