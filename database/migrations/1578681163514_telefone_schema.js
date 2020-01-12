"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TelefoneSchema extends Schema {
  up() {
    this.create("telefones", table => {
      table.increments();
      table.string("numero").notNullable();
      table.boolean("whats_app").notNullable();
      table
        .integer("cliente_id")
        .unsigned()
        .references("id")
        .inTable("clientes")
        .onUpdate("cascade")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("telefones");
  }
}

module.exports = TelefoneSchema;
