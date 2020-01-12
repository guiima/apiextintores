"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrcamentoSchema extends Schema {
  up() {
    this.create("orcamentos", table => {
      table.increments();
      table.decimal("valor").notNullable();
      table.enu("status", ["aberto", "efetuado"]).notNullable();
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
    this.drop("orcamentos");
  }
}

module.exports = OrcamentoSchema;
