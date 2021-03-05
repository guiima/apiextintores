"use strict";

const Orcamento = use("App/Models/Orcamento");
const Cliente = use("App/Models/Cliente");

class PesquisaOrcamentoController {
  async index() {}

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

  async buscaCnpj({ request }) {
    const { cnpj } = request.only(["cnpj"]);

    const data = await Cliente.query()
      .where("cnpj", "like", `%${cnpj}%`)
      .with("orcamento", (orcamento) => {
        orcamento.with("item_orcamento", (item) => {
          item.with("orcamento");
        });
      })
      .fetch();
    return data;
  }

  async buscaCpf({ request }) {
    const { cpf } = request.only(["cpf"]);

    const data = await Cliente.query()
      .where("cpf", "like", `%${cpf}%`)
      .with("orcamento", (orcamento) => {
        orcamento.with("item_orcamento", (item) => {
          item.with("orcamento");
        });
      })
      .fetch();
    return data;
  }

  async buscaEndereco({ request }) {
    const { endereco } = request.only(["endereco"]);
    const data = await Cliente.query()
      .where("endereco", "like", `%${endereco}%`)
      .with("orcamento", (orcamento) => {
        orcamento.with("item_orcamento", (item) => {
          item.with("orcamento");
        });
      })
      .fetch();
    return data;
  }

  async buscaResponsavel({ request }) {
    const { responsavel } = request.only(["responsavel"]);

    const data = await Cliente.query()
      .where("responsavel", "like", `%${responsavel}%`)
      .with("orcamento", (orcamento) => {
        orcamento.with("item_orcamento", (item) => {
          item.with("orcamento");
        });
      })
      .fetch();
    return data;
  }
}

module.exports = PesquisaOrcamentoController;
