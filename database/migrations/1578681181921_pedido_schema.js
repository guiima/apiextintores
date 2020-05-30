"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PedidoSchema extends Schema {
  up() {
    this.create("pedidos", (table) => {
      table.increments();
      table.decimal("valor_pago").notNullable();
      table.decimal("valor_total").notNullable();
      table.enu("status", ["aberto", "pago"]).notNullable();
      table.boolean("entregue").notNullable();
      table
        .integer("cliente_id")
        .unsigned()
        .references("id")
        .inTable("clientes")
        .onUpdate("cascade")
        .onDelete("set null");
      table.timestamps();
    });
  }

  down() {
    this.drop("pedidos");
  }
}

module.exports = PedidoSchema;
