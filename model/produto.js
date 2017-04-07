var Produto = function (nome, preco, boleto, cartaoLoja) {
    this.nome = nome;
    this.preco = preco;
    this.boleto = boleto;
    this.cartaoLoja = cartaoLoja;
};

module.exports = Produto;