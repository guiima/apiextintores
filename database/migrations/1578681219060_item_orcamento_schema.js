"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ItemOrcamentoSchema extends Schema {
  up() {
    this.create("item_orcamentos", table => {
      table.increments();
      table.integer("quantidade").notNullable();
      table
        .integer("orcamento_id")
        .unsigned()
        .references("id")
        .inTable("orcamentos")
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
    this.drop("item_orcamentos");
  }
}

module.exports = ItemOrcamentoSchema;
