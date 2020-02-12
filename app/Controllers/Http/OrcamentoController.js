"use strict";

const Database = use("Database");
const Orcamento = use("App/Models/Orcamento");

class OrcamentoController {
  async index({ request, response, view }) {}

  async store({ request }) {
    const data = request.only(["valor", "status", "cliente_id"]);
    const itens_orcamento = request.input("itens");

    const trx = await Database.beginTransaction();

    const orcamento = await Orcamento.create(data, trx);
    await orcamento.item_orcamento().createMany(itens_orcamento, trx);

    await trx.commit();

    return orcamento;
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = OrcamentoController;
