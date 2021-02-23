"use strict";

const Cliente = use("App/Models/Cliente");
// const ItemPeido = use("App/Models/ItemPedido");
const Usuario = use("App/Models/Usuario");

class ClienteItemController {
  async store({ request }) {
    const { nome_fantasia, id } = request.only(["nome_fantasia", "id"]);

    const response = JSON.stringify(await Usuario.findBy("id", id));

    const usuario = JSON.parse(response);

    if (usuario.tipo === "administrador") {
      const data = await Cliente.query()
        .where("nome_fantasia", "like", `%${nome_fantasia}%`)
        .with("pedido", (pedido) => {
          pedido.with("item_pedido", (item) => {
            item.with("produto");
          });
        })
        .fetch();
      return data;
    } else {
      const data = await Cliente.query()
        .where("nome_fantasia", "like", `%${nome_fantasia}%`)
        .where("usuario_id", id)
        .with("pedido", (pedido) => {
          pedido.with("item_pedido", (item) => {
            item.with("produto");
          });
        })
        .fetch();
      return data;
    }
  }

  async buscacpf({ request }) {
    const { cpf } = request.only(["cpf"]);

    const data = await Cliente.query()
      .where("cpf", "like", `%${cpf}%`)
      .with("pedido", (pedido) => {
        pedido.with("item_pedido", (item) => {
          item.with("produto");
        });
      })
      .fetch();
    return data;
  }

  async buscacnpj({ request }) {
    const { cnpj } = request.only(["cnpj"]);

    const data = await Cliente.query()
      .where("cnpj", "like", `%${cnpj}%`)
      .with("pedido", (pedido) => {
        pedido.with("item_pedido", (item) => {
          item.with("produto");
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
          item.with("produto");
        });
      })
      .fetch();
    return data;
  }

  async clienteAll({ params }) {
    const data = await Cliente.query()
      .where("id", params.id)
      .with("pedido", (pedido) => {
        pedido.with("item_pedido", (item) => {
          item.with("produto");
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
          item.with("produto");
        });
      })
      .fetch();
    return data;
  }

  async buscaData({ request }) {
    const { data_inicio, data_final } = request.only([
      "data_inicio",
      "data_final",
    ]);

    // const data = await ItemPeido.query()
    //   .where("validade", ">=", data_inicio)
    //   .where("validade", "<=", data_final)
    //   .with("produto")
    //   .with("pedido", pedido => {
    //     pedido.with("cliente");
    //   })
    //   .fetch();

    // return data;

    const data = await Cliente.query()
      .with("pedido", (pedido) => {
        pedido.with("item_pedido", (item) => {
          item
            .with("produto")
            .where("validade", ">=", data_inicio)
            .where("validade", "<=", data_final);
        });
      })
      .fetch();
    return data;
  }
}

module.exports = ClienteItemController;
