"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Parcela extends Model {
  forma_pagamento() {
    return this.belongsTo("App/Models/FormaPagamento");
  }
}

module.exports = Parcela;
