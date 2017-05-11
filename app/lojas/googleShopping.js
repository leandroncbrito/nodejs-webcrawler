'use strict';

const Lojas = require('./lojas.js');
const Produto = require('../model/produto.js');

class GoogleShopping extends Lojas {

    buscarDados($) {

        let produtos = [];

        let nome = $('title').text();
        console.log('\n' + nome + '\n');

        $('html > body #os-sellers-table > .os-row').each(function (i, element) {

            let nomeLoja = $(this).find('td.os-seller-name').text().trim();
            let preco = $(this).find('td.os-price-col').text();
            let link = $(this).find('td.os-seller-name .os-seller-name-primary a').attr('href');

            console.log(nomeLoja + ' ' + preco);

            produtos.push(new Produto(nome, nomeLoja, preco, link));

        });
        
        return produtos;

    }
}

module.exports = GoogleShopping;