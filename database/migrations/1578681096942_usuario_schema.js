"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsuarioSchema extends Schema {
  up() {
    this.create("usuarios", table => {
      table.increments();
      table.string("nome").notNullable();
      table
        .string("login")
        .notNullable()
        .unique();
      table.string("senha", 8).notNullable();
      table.enu("tipo", ["adm", "consultor"]).notNullable();
      //---- 0 o uruario não está ativo e 1 está ativo ----
      table.boolean("status").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("usuarios");
  }
}

module.exports = UsuarioSchema;
