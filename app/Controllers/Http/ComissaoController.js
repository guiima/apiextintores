"use strict";

const Database = use("Database");
const Comissao = use("App/Models/Comissao");

class ComissaoController {
  async index() {}

  async store({ request, response }) {}

  async show({ params }) {
    // const data = await Cliente.query()
    //   .where("nome_fantasia", "like", `%${nome_fantasia}%`)
    //   .with("pedido", (pedido) => {
    //     pedido.with("item_pedido", (item) => {
    //       item.with("produto");
    //     });
    //   })
    //   .fetch();

    const comissoes = await Comissao.query()
      .where("isvalid", true)
      .where("valor_receber", ">", 0)
      .where("usuario_id", params.id)
      .with("pedido", (pedido) => {
        pedido.with("cliente");
      })
      .fetch();

    // const comissoes = await Database.from("comissaos")
    //   .where("isvalid", true)
    //   .where("valor_receber", ">", 0)
    //   .where("usuario_id", params.id)
    //   .with("pedido");

    const sumComissoes = await Database.from("comissaos")
      .sum("valor_receber")
      .where("isvalid", true)
      .where("valor_receber", ">", 0)
      .where("usuario_id", params.id);

    console.log("com", sumComissoes[0]);
    console.log("com2", comissoes);

    const objt = {
      sum: sumComissoes[0].sum,
      json: comissoes,
    };

    return objt;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ComissaoController;
