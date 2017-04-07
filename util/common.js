module.exports = {
    converterParaDecimal: function(valor) {
        if (!valor) {
            return 0;
        }
        return parseFloat(valor.replace(/\D/g, ''))
    }
}