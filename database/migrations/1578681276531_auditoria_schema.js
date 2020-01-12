"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AuditoriaSchema extends Schema {
  up() {
    this.create("auditorias", table => {
      table.increments();
      table.string("acao").notNullable();
      table.string("nome_campo").notNullable();
      table.string("valor_antigo").notNullable();
      table.string("valor_atualizado").notNullable();
      table
        .integer("comissao_id")
        .unsigned()
        .references("id")
        .inTable("comissaos")
        .onUpdate("cascade")
        .onDelete("cascade");
      table
        .integer("pedido_id")
        .unsigned()
        .references("id")
        .inTable("pedidos")
        .onUpdate("cascade")
        .onDelete("cascade");
      table
        .integer("cliente_id")
        .unsigned()
        .references("id")
        .inTable("clientes")
        .onUpdate("cascade")
        .onDelete("cascade");
      table
        .integer("usuario_id")
        .unsigned()
        .references("id")
        .inTable("usuarios")
        .onUpdate("cascade")
        .onDelete("set null");
      table
        .integer("produto_id")
        .unsigned()
        .references("id")
        .inTable("produtos")
        .onUpdate("cascade")
        .onDelete("cascade");
      table
        .integer("orcamento_id")
        .unsigned()
        .references("id")
        .inTable("orcamentos")
        .onUpdate("cascade")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("auditorias");
  }
}

module.exports = AuditoriaSchema;
