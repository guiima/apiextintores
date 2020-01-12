"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Orcamento extends Model {
  item_orcamento() {
    return this.hasMany("App/Models/ItemOrcamento");
  }

  auditoria() {
    return this.hasMany("App/Models/Auditoria");
  }

  cliente() {
    return this.belongsTo("App/Models/Cliente");
  }
}

module.exports = Orcamento;
