"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ItemPedidoSchema extends Schema {
  up() {
    this.create("item_pedidos", table => {
      table.increments();
      table.integer("quantidade").notNullable();
      table.decimal("desconto");
      table.date("validade");
      table
        .integer("pedido_id")
        .unsigned()
        .references("id")
        .inTable("pedidos")
        .onUpdate("cascade")
        .onDelete("cascade");
      table
        .integer("produto_id")
        .unsigned()
        .references("id")
        .inTable("produtos")
        .onUpdate("cascade")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("item_pedidos");
  }
}

module.exports = ItemPedidoSchema;
