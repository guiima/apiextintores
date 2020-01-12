"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ItemPedido extends Model {
  pedido() {
    return this.belongsTo("App/Models/Pedido");
  }

  produto() {
    return this.belongsTo("App/Models/Produto");
  }
}

module.exports = ItemPedido;
