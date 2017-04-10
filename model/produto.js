'use strict';

var Produto = function (nome, valores) {
    this.nome = nome;
    this.link = '';
    this.valores = {
        preco: valores.preco,
        precoDescricao: valores.precoDescricao,
        boleto: valores.boleto,
        boletoDescricao: valores.boletoDescricao,
        cartaoLoja: valores.cartaoLoja,
        cartaoLojaDescricao: valores.cartaoLojaDescricao
    };
};

module.exports = Produto;