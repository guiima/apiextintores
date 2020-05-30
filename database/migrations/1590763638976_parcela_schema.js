"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ParcelaSchema extends Schema {
  up() {
    this.create("parcelas", (table) => {
      table.increments();
      table.date("data").notNullable();
      table.boolean("pago").notNullable();
      table
        .integer("forma_pagamento_id")
        .unsigned()
        .references("id")
        .inTable("forma_pagamentos")
        .onUpdate("cascade")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("parcelas");
  }
}

module.exports = ParcelaSchema;
