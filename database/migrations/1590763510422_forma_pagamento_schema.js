"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FormaPagamentoSchema extends Schema {
  up() {
    this.create("forma_pagamentos", (table) => {
      table.increments();
      table.integer("numero_parcelas").notNullable();
      table.enu("tipo_pagamento", ["avista", "parcelado"]).notNullable();
      table
        .integer("pedido_id")
        .unsigned()
        .references("id")
        .inTable("pedidos")
        .onUpdate("cascade")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("forma_pagamentos");
  }
}

module.exports = FormaPagamentoSchema;
