"use strict";

const Database = use("Database");

class ComissaoController {
  async index() {
    const comissoes = await Database.from("comissaos")
      .where("isvalid", true)
      .where("valor_receber", ">", 0);

    const sumComissoes = await Database.from("comissaos")
      .sum("valor_receber")
      .where("isvalid", true)
      .where("valor_receber", ">", 0);

    console.log("com", sumComissoes[0]);
    console.log("com2", comissoes);

    const objt = {
      sum: sumComissoes[0].sum,
      json: comissoes,
    };

    return objt;
  }

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ComissaoController;
