'use strict';

const config = require("../config/settings.json");
const nodemailer = require('nodemailer');

let msg = '';

const gerarTituloDaMensagem = (nomeDoProduto) =>    
    msg += `<strong>${nomeDoProduto} </strong><br>`;

const gerarCorpoDaMensagem = (descricaoProduto) =>
    msg += `<br>${descricaoProduto}`;

const gerarLinkDaMensagem = (linkDoProduto) =>
    msg += `<br><br><strong><a href="${linkDoProduto}" alt="${linkDoProduto}">LINK PARA O PRODUTO</a></strong>`

module.exports = {

    enviar: (mensagem) => {

        return new Promise((resolve, reject) => {

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

    gerarEmail: (produto, quedaDePreco) => {

        msg = '';

        gerarTituloDaMensagem(produto.nome);

        if (quedaDePreco.precoMenor) {
            gerarCorpoDaMensagem(produto.valores.precoDescricao);
        }

        if (quedaDePreco.boletoMenor) {
            gerarCorpoDaMensagem(produto.valores.boletoDescricao);
        }

        if (quedaDePreco.cartaoLojaMenor) {
            gerarCorpoDaMensagem(produto.valores.cartaoLojaDescricao);
        }

        gerarLinkDaMensagem(produto.link);

        return msg;

    }

};