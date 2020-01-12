"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClienteSchema extends Schema {
  up() {
    this.create("clientes", table => {
      table.increments();
      table.string("nome_fantasia").notNullable();
      table.string("razao_social");
      table.enu("tipo_pessoa", ["fisica", "juridica"]).notNullable();
      table.decimal("metragem");
      table.string("cpf").notNullable();
      table.string("cnpj");
      table
        .string("endereco")
        .notNullable()
        .unique();
      table.string("cep").notNullable();
      table.boolean("mei");
      table.date("data_nascimento");
      table.string("responsavel").notNullable();
      table.text("observacao");
      table.string("inscricao_estadual");
      table.boolean("privado").notNullable();
      table.enu("status", ["ativo", "desativado"]).notNullable();
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
    this.drop("clientes");
  }
}

module.exports = ClienteSchema;
