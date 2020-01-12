"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Cliente extends Model {
  usuario() {
    return this.belongsTo("App/Models/Usuario");
  }

  pedido() {
    return this.hasMany("App/Models/Pedido");
  }

  auditoria() {
    return this.hasMany("App/Models/Auditoria");
  }

  orcamento() {
    return this.hasMany("App/Models/Orcamento");
  }

  email() {
    return this.hasMany("App/Models/Email");
  }

  telefone() {
    return this.hasMany("App/Models/Telefone");
  }
}

module.exports = Cliente;
