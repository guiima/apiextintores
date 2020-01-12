"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Produto extends Model {
  auditoria() {
    return this.hasMany("App/Models/Auditoria");
  }

  item_pedido() {
    return this.hasMany("App/Models/ItemPedido");
  }

  item_orcamemto() {
    return this.hasMany("App/Models/ItemOrcamento");
  }
}

module.exports = Produto;
