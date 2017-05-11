'use strict';

class Produto {
    constructor(nome, nomeLoja, preco, link) {
        this.nome = nome;
        this.nomeLoja = nomeLoja;        
        this.preco= preco;            
        this.link = link;
    }
}

module.exports = Produto;