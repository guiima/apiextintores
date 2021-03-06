"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProdutoSchema extends Schema {
  up() {
    this.create("produtos", table => {
      table.increments();
      table.string("tipo");
      table.string("classe");
      table.decimal("carga_nominal");
      table.decimal("peso");
      table.decimal("valor");
      table.integer("qtd_atual");
      table.integer("qtd_minima");
      table.string("nome");
      table.enu("categoria", ["acessorio", "extintor", "servico"]);
      table.date("validade");
      table.boolean("status").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("produtos");
  }
}

module.exports = ProdutoSchema;
