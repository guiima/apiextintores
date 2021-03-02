"use strict";

const Orcamento = use("App/Models/Orcamento");
const Cliente = use("App/Models/Cliente");

class PesquisaOrcamentoController {
  async index() {}

  async store({ request }) {}

  async buscaPorData({ request }) {
    const { data_inicio, data_final } = request.only([
      "data_inicio",
      "data_final",
    ]);
    const orcamentos = await Orcamento.query()
      .where("created_at", ">", data_inicio)
      .where("created_at", "<", data_final)
      .with("cliente")
      .fetch();

    return orcamentos;
  }

  async buscaNomaFantasia({ request }) {
    const { nome_fantasia } = request.only(["nome_fantasia", "id"]);

    const data = await Cliente.query()
      .where("nome_fantasia", "like", `%${nome_fantasia}%`)
      .with("orcamento", (orcamento) => {
        orcamento.with("item_orcamento", (item) => {
          item.with("orcamento");
        });
      })
      .fetch();
    return data;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = PesquisaOrcamentoController;
