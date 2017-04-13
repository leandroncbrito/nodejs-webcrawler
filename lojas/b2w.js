'use strict';

const common = require('../util/common.js');
const Lojas = require('./lojas.js');
const Produto = require('../model/produto.js');

class B2W extends Lojas {
    
    buscarDados($) {

        let nome = $('html > body .product-name').text();
        let preco = $('html > body .main-price > .sales-price').text();
        let boleto = $('html > body .payment-option-price').eq(0);
        let cartaoLoja = $('html > body .payment-option-price').eq(1);

        let boletoDescricao = boleto.parent().text();
        let cartaoLojaDescricao = cartaoLoja.parent().text();

        let valorPreco = common.converterParaDecimal(preco);
        let valorBoleto = common.converterParaDecimal(boleto.text());
        let valorCartaoLoja = common.converterParaDecimal(cartaoLoja.text());

        console.log(nome);
        console.log(preco);
        console.log(boletoDescricao);
        console.log(cartaoLojaDescricao);

        let valores = {
            preco: valorPreco,
            precoDescricao: preco,
            boleto: valorBoleto,
            boletoDescricao: boletoDescricao,
            cartaoLoja: valorCartaoLoja,
            cartaoLojaDescricao: cartaoLojaDescricao
        };

        return new Produto(nome, valores);

    }
}

module.exports = B2W;