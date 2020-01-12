"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ComissaoSchema extends Schema {
  up() {
    this.create("comissaos", table => {
      table.increments();
      table.decimal("valor").notNullable();
      table
        .integer("pedido_id")
        .unsigned()
        .references("id")
        .inTable("pedidos")
        .onUpdate("cascade")
        .onDelete("cascade");
      table
        .integer("usuario_id")
        .unsigned()
        .references("id")
        .inTable("usuarios")
        .onUpdate("cascade")
        .onDelete("set null");
      table.timestamps();
    });
  }

  down() {
    this.drop("comissaos");
  }
}

module.exports = ComissaoSchema;
