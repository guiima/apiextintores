"use strict";

const ItemOrcamento = use("App/Models/ItemOrcamento");

class ItemOrcamentoController {
  async index({ request, response, view }) {}

  async create({ request, response, view }) {}

  async store({ request, response }) {}

  async show({ params }) {
    const data = await ItemOrcamento.query()
      .where("orcamento_id", params.id)
      .with("produto")
      .fetch();

    return data;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ItemOrcamentoController;
