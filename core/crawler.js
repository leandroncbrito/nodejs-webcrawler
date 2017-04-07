var request = require('request');
var cheerio = require('cheerio');
var Lojas = require('../lojas/lojas.js');
var B2W = require('../lojas/b2w.js');
var email = require('../util/email.js');
var config = require('../settings.json');

const pagina = config.page;
const precobase = config.price;
var interval = config.minutes * 60 * 1000;
var mensagem = '';
var precoBaixou = false;

function VerificarPrecoMontarEmail(precoDoSite, descricao) {
    if (precoDoSite > 0 && precoDoSite < precobase) {
        mensagem += descricao + '<br>';
        precoBaixou = true;
    }
}

module.exports = {

    buscarDados: function (enviaremail) {

        console.log("\nPágina: " + pagina);

        request(pagina, function (error, response, body) {

            if (error) {
                console.log("Erro: " + error);
            }

            if (response.statusCode === 200) {

                precoBaixou = false;

                // Parse the document body
                var $ = cheerio.load(body);

                let lojas = new Lojas();
                let produto = lojas.buscarDados(new B2W(), $);

                mensagem = '<strong>' + produto.nome + '</strong>';

                VerificarPrecoMontarEmail(produto.valores.preco, produto.valores.precoDescricao);
                VerificarPrecoMontarEmail(produto.valores.boleto, produto.valores.boletoDescricao);
                VerificarPrecoMontarEmail(produto.valores.cartaoLoja, produto.valores.cartaoLojaDescricao);

                if (precoBaixou) {

                    mensagem += '<br><br><strong><a href="' + pagina + '">LINK PARA O PRODUTO</a></strong>';
                    console.log('Baixou o preço!');
                    //console.log(mensagem);

                    if (enviaremail) {
                        email.enviar(mensagem).then(function () {
                            process.exit(1);
                        });
                    }
                }

            }
        });
    }
}