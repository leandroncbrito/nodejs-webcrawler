'use strict';

const request = require('request');
const cheerio = require('cheerio');
const B2W = require('../lojas/b2w.js');
const QuedaDePreco = require('../model/quedaDePreco.js');
const Email = require('../../util/email.js');
const config = require('../../config/settings.json');

const searchProducts = config.products;

let enviandoEmail = false;

const ProcessarProdutoEnviarEmail = (produto, enviaremail) => {

    let quedaDePreco = new QuedaDePreco();

    quedaDePreco.precoMenor = VerificarPreco(produto.valores.preco, produto.precoBase);
    quedaDePreco.boletoMenor = VerificarPreco(produto.valores.boleto, produto.precoBase);
    quedaDePreco.cartaoLojaMenor = VerificarPreco(produto.valores.cartaoLoja, produto.precoBase);
    
    console.log(quedaDePreco);

    if (quedaDePreco.precoMenor || quedaDePreco.boletoMenor || quedaDePreco.cartaoLojaMenor) {

        console.log('Baixou o preço!\n-----------------------------------------------------------------\n');

        if (enviaremail) {
            EnviarEMail(produto, quedaDePreco);
        }
    }
}

const VerificarPreco = (precoDoSite, precoBase) => {
    return (precoDoSite > 0 && precoDoSite < precoBase);
}

const EnviarEMail = (produto, quedaDePreco) => {

    if (!enviandoEmail) {
        
        enviandoEmail = true;

        let mensagem = Email.gerarEmail(produto, quedaDePreco);

        //console.log(mensagem);

        Email.enviar(mensagem).then(function () {
            process.exit(1);
        });
    }
}

module.exports = {

    buscarDados: (enviaremail) => {

        for (let index = 0; index < searchProducts.length; index++) {

            let srcProduct = searchProducts[index];

            request(srcProduct.url, function (error, response, body) {

                if (error) {
                    console.log("Erro: " + error);
                }

                if (response.statusCode === 200) {

                    // Parse the document body
                    let $ = cheerio.load(body);

                    let b2w = new B2W();
                    let produto = b2w.buscarDados($);

                    produto.link = srcProduct.url;
                    produto.precoBase = srcProduct.price;

                    console.log(produto.precoBase);

                    ProcessarProdutoEnviarEmail(produto, enviaremail);
                }
            });
        }
    }
}
