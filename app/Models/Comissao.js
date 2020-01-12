"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Comissao extends Model {
  pedido() {
    return this.belongsTo("App/Models/Pedido");
  }

  auditoria() {
    return this.hasMany("App/Models/Auditoria");
  }

  usuario() {
    return this.belongsTo("App/Models/Usuario");
  }
}

module.exports = Comissao;
