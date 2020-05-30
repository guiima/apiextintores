"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class FormaPagamento extends Model {
  pedido() {
    return this.belongsTo("App/Models/Pedido");
  }

  parcela() {
    return this.hasMany("App/Models/Parcela");
  }
}

module.exports = FormaPagamento;
