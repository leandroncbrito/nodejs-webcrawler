'use strict';

const request = require('request');
const cheerio = require('cheerio');
const B2W = require('../lojas/b2w.js');
const QuedaDePreco = require('../model/quedaDePreco.js');
const Email = require('../util/email.js');
const config = require('../settings.json');

const paginas = config.pages;
const precobase = config.price;

const ProcessarProdutoEnviarEmail = (produto, enviaremail) => {
    
    let quedaDePreco = new QuedaDePreco();

    quedaDePreco.precoMenor = VerificarPreco(produto.valores.preco);
    quedaDePreco.boletoMenor = VerificarPreco(produto.valores.boleto);
    quedaDePreco.cartaoLojaMenor = VerificarPreco(produto.valores.cartaoLoja);

    if (quedaDePreco.precoMenor || quedaDePreco.boletoMenor || quedaDePreco.cartaoLojaMenor) {

        console.log('Baixou o preço!\n-----------------------------------------------------------------\n');

        if (enviaremail) {

            let mensagem = Email.gerarEmail(produto, quedaDePreco);

            //console.log(mensagem);
            Email.enviar(mensagem).then(function () {
                process.exit(1);
            });

        }
    }
}

const VerificarPreco = (precoDoSite, descricao) => {
    return (precoDoSite > 0 && precoDoSite < precobase);
}

module.exports = {

    buscarDados: (enviaremail) => {

        for (let index = 0; index < paginas.length; index++) {

            let pagina = paginas[index];

            request(pagina, function (error, response, body) {

                if (error) {
                    console.log("Erro: " + error);
                }

                if (response.statusCode === 200) {

                    // Parse the document body
                    let $ = cheerio.load(body);

                    let b2w = new B2W();
                    let produto = b2w.buscarDados($);

                    produto.link = pagina;

                    ProcessarProdutoEnviarEmail(produto, enviaremail);
                    
                }
            });
        }
    }
}