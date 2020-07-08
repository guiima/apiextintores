"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsuarioSchema extends Schema {
  up() {
    this.create("usuarios", (table) => {
      table.increments();
      table.string("nome").notNullable();
      table.string("login").notNullable().unique();
      table.string("senha").notNullable();
      table.enu("tipo", ["administrador", "consultor"]).notNullable();
      //---- 0 o uruario não está ativo e 1 está ativo ----
      table.boolean("status").notNullable();
      table.decimal("meta").notNullable();
      table.integer("porcentagem_comissao").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("usuarios");
  }
}

module.exports = UsuarioSchema;
