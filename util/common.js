'use strict';

module.exports = {
    converterParaDecimal: (valor) => {
        if (!valor) {
            return 0;
        }
        return parseFloat(valor.replace(/\D/g, ''))
    }
}