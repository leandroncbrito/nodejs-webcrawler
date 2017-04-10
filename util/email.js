'use strict';

var config = require("../settings.json");
var nodemailer = require('nodemailer');

function gerarTituloDaMensagem(nomeDoProduto, mensagem) {
    mensagem += '<strong>' + nomeDoProduto + '</strong><br>';
};

function gerarCorpoDaMensagem(descricaoProduto, mensagem) {
    mensagem += "<br>" + descricaoProduto;
};

function gerarLinkDaMensagem(linkDoProduto, mensagem) {
    mensagem += '<br><br><strong><a href="' + linkDoProduto + '" alt="' + linkDoProduto + '">LINK PARA O PRODUTO</a></strong>';
};

module.exports = {

    enviar: function (mensagem) {

        return new Promise(function (resolve, reject) {

            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: process.env.USERMAIL,
                    pass: process.env.PASSMAIL
                }
            });

            let mailOptions = {
                from: '"NodeJs WebCrawler" <' + process.env.USERMAIL + '>',
                to: config.to,
                subject: 'NodeJs WebCrawler ✔',
                html: mensagem
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject();
                    return console.log(error);
                }
                console.log('Mensagem %s enviada: %s', info.messageId, info.response);
                resolve();
            });

            transporter.close();

        });
    },

    gerarEmail: function (produto, quedaDePreco) {

        let mensagem = '';

        gerarTituloDaMensagem(produto.nome, mensagem);

        if (quedaDePreco.precoMenor) {
            gerarCorpoDaMensagem(produto.valores.precoDescricao, mensagem);
        }

        if (quedaDePreco.boletoMenor) {
            gerarCorpoDaMensagem(produto.valores.boletoDescricao, mensagem);
        }

        if (quedaDePreco.cartaoLojaMenor) {
            gerarCorpoDaMensagem(produto.valores.cartaoLojaDescricao, mensagem);
        }

        gerarLinkDaMensagem(produto.link, mensagem);

        return mensagem;

    }

};