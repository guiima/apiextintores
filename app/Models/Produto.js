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

  // static get dates() {
  //   return super.dates.concat(["validade"]);
  // }

  // static formatDates(field, value) {
  //   // new Date(value);
  //   if (field === "validade") {
  //     return value.format("DD/MM/YYYY");
  //   }
  //   return super.formatDates(field, value);
  // }
}

module.exports = Produto;
