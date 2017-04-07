var Produto = require('./produto.js');

var B2W = function () { };

B2W.prototype = {

    buscarDados: function ($) {

        let nome = $('html > body .product-name').text();
        let preco = $('html > body .main-price > .sales-price').text();
        let boleto = $('html > body .payment-option-price').eq(0).text();
        let cartaoLoja = $('html > body .payment-option-price').eq(1).text();

        console.log('Preço: ' + preco);
        console.log('Boleto bancário: ' + boleto);
        console.log('Cartão de crédito da loja: ' + cartaoLoja);

         return new Produto(nome, preco, boleto, cartaoLoja);

    },

};

module.exports = B2W;