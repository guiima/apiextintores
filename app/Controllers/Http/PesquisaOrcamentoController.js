"use strict";

const Pedido = use("App/Models/Orcamento");

class PesquisaOrcamentoController {
  async index() {}

  async store({ request }) {}

  async show({ request }) {
    const { data_inicio, data_final } = request.only([
      "data_inicio",
      "data_final",
    ]);
    const pedidos = await Pedido.query()
      .where("created_at", ">", data_inicio)
      .where("created_at", "<", data_final)
      .with("cliente")
      .fetch();

    return pedidos;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = PesquisaOrcamentoController;
