"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Pedido extends Model {
  comissao() {
    return this.hasOne("App/Models/Comissao");
  }

  item_pedido() {
    return this.hasMany("App/Models/ItemPedido");
  }

  auditoria() {
    return this.hasMany("App/Models/Auditoria");
  }

  cliente() {
    return this.belongsTo("App/Models/Cliente");
  }

  forma_pagamento() {
    return this.hasOne("App/Models/FormaPagamento");
  }
}

module.exports = Pedido;
