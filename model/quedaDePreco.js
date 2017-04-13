'use strict';

class QuedaDePreco {

    get precoMenor() {
        return this._precoMenor;
    }

    set precoMenor(precoMenor) {
        this._precoMenor = precoMenor;
    }

    get boletoMenor() {
        return this._boletoMenor;
    }

    set boletoMenor(boletoMenor) {
        this._boletoMenor = boletoMenor;
    }

    get cartaoLojaMenor() {
        return this._cartaoLojaMenor;
    }

    set cartaoLojaMenor(cartaoLojaMenor) {
        this._cartaoLojaMenor = cartaoLojaMenor;
    }
}

module.exports = QuedaDePreco;