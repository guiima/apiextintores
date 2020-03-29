"use strict";

const Cliente = use("App/Models/Cliente");

class ClienteItemController {
  async store({ request }) {
    const { nome_fantasia } = request.only(["nome_fantasia"]);
    const data = await Cliente.query()
      .where("nome_fantasia", "like", `%${nome_fantasia}%`)
      .with("pedido", pedido => {
        pedido.with("item_pedido", item => {
          item.with("produto");
        });
      })
      .fetch();
    return data;
  }
}

module.exports = ClienteItemController;
