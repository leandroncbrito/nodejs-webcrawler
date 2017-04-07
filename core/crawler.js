var request = require('request');
var cheerio = require('cheerio');
var common = require('../util/common.js');
var Lojas = require('../lojas/lojas.js');
var B2W = require('../lojas/b2w.js');
var email = require('../util/email.js');
var config = require('../settings.json');

const pagina = config.page;
const precobase = config.price;
var interval = config.minutes * 60 * 1000;

module.exports = {

    buscarDados: function (enviaremail) {

        console.log("Página: " + pagina);

        request(pagina, function (error, response, body) {

            if (error) {
                console.log("Erro: " + error);
            }

            if (response.statusCode === 200) {

                // Parse the document body
                var $ = cheerio.load(body);

                let lojas = new Lojas();
                let produto = lojas.buscarDados(new B2W(), $);

                let valorPreco = common.converterParaDecimal(produto.preco);
                let valorBoleto = common.converterParaDecimal(produto.boleto);
                let valorCartaoLoja = common.converterParaDecimal(produto.cartaoLoja);

                let baixou = 0;
                let mensagem = '<strong>' + produto.nome + '</strong><br><br>';

                if (valorBoleto < precobase) {
                    baixou++;
                    mensagem += produto.boleto + ' no boleto<br>';
                }

                if (valorPreco < precobase) {
                    baixou++;
                    mensagem += produto.preco + ' no cartão<br>';
                }

                if (valorCartaoLoja < precobase) {
                    baixou++;
                    mensagem += produto.cartaoLoja + ' no cartão da loja';
                }

                if (baixou > 0) {

                    mensagem += '<br><br><strong><a href="' + pagina + '">LINK PARA O PRODUTO</a></strong>';
                    console.log('Baixou o preço!');

                    if (enviaremail) {                        
                        email.enviar(mensagem).then(function () {                            
                            process.exit(1);
                        });
                    }
                }

                console.log('\n');
                
            }
        });
    }
}