var Lojas = function() {
    this.empresa = {};
};

Lojas.prototype = {    
    buscarDados: function(empresa, $) {
        this.empresa = empresa;
        return this.empresa.buscarDados($);
    }
};

module.exports = Lojas;