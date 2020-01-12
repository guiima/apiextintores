"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ItemOrcamento extends Model {
  orcamento() {
    return this.belongsTo("App/Models/Orcamento");
  }

  produto() {
    return this.belongsTo("App/Models/Produto");
  }
}

module.exports = ItemOrcamento;
