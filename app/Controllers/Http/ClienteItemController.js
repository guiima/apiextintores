"use strict";

const Database = use("Database");
const Cliente = use("App/Models/Cliente");
const ItemPedido = use("App/Models/ItemPedido");

class ClienteItemController {
  async store({ request }) {
    const { nome_fantasia } = request.only(["nome_fantasia"]);

    const cliente = await Cliente.query()
      .where("nome_fantasia", "like", `%${nome_fantasia}%`)
      .with("pedido", pedido => {
        console.log(pedido.primaryKey);
      })
      .fetch();

    return cliente;
  }
}

module.exports = ClienteItemController;
