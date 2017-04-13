'use strict';

class Produto {
    constructor(nome, valores) {
        this.nome = nome;
        this._link = '';
        this.valores = {
            preco: valores.preco,
            precoDescricao: valores.precoDescricao,
            boleto: valores.boleto,
            boletoDescricao: valores.boletoDescricao,
            cartaoLoja: valores.cartaoLoja,
            cartaoLojaDescricao: valores.cartaoLojaDescricao
        };
    }

    get link() {
        return this._link;
    }

    set link(link) {
        this._link = link;
    }
}

module.exports = Produto;