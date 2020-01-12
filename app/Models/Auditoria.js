"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Auditoria extends Model {
  usuario() {
    return this.belongsTo("App/Models/Usuario");
  }

  comissao() {
    return this.belongsTo("App/Models/Comissao");
  }

  pedido() {
    return this.belongsTo("App/Models/Pedido");
  }

  produto() {
    return this.belongsTo("App/Models/Produto");
  }

  orcamento() {
    return this.belongsTo("App/Models/Orcamento");
  }

  cliente() {
    return this.belongsTo("App/Models/Cliente");
  }
}

module.exports = Auditoria;
