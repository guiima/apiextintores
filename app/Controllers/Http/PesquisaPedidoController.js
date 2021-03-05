"use strict";

const Pedido = use("App/Models/Pedido");
const Cliente = use("App/Models/Cliente");

class PesquisaPedidoController {
  async buscapordata({ request }) {
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

  async sumTotal({ request }) {
    const { data_inicio, data_final } = request.only([
      "data_inicio",
      "data_final",
    ]);

    const soma = await Pedido.query()
      .whereBetween("created_at", [data_inicio, data_final])
      .sum("valor_total");

    return soma;
  }

  async buscaNomaFantasia({ request }) {
    const { nome_fantasia } = request.only(["nome_fantasia", "id"]);

    const data = await Cliente.query()
      .where("nome_fantasia", "like", `%${nome_fantasia}%`)
      .with("pedido", (pedido) => {
        pedido.with("item_pedido", (item) => {
          item.with("pedido");
        });
      })
      .fetch();
    return data;
  }

  async buscaCnpj({ request }) {
    const { cnpj } = request.only(["cnpj"]);

    const data = await Cliente.query()
      .where("cnpj", "like", `%${cnpj}%`)
      .with("pedido", (pedido) => {
        pedido.with("item_pedido", (item) => {
          item.with("pedido");
        });
      })
      .fetch();
    return data;
  }

  async buscaCpf({ request }) {
    const { cpf } = request.only(["cpf"]);

    const data = await Cliente.query()
      .where("cpf", "like", `%${cpf}%`)
      .with("pedido", (pedido) => {
        pedido.with("item_pedido", (item) => {
          item.with("pedido");
        });
      })
      .fetch();
    return data;
  }

  async buscaEndereco({ request }) {
    const { endereco } = request.only(["endereco"]);
    const data = await Cliente.query()
      .where("endereco", "like", `%${endereco}%`)
      .with("pedido", (pedido) => {
        pedido.with("item_pedido", (item) => {
          item.with("pedido");
        });
      })
      .fetch();
    return data;
  }

  async buscaResponsavel({ request }) {
    const { responsavel } = request.only(["responsavel"]);

    const data = await Cliente.query()
      .where("responsavel", "like", `%${responsavel}%`)
      .with("pedido", (pedido) => {
        pedido.with("item_pedido", (item) => {
          item.with("pedido");
        });
      })
      .fetch();
    return data;
  }
}

module.exports = PesquisaPedidoController;
