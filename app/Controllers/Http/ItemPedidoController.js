"use strict";

const Database = use("Database");
const ItemPedido = use("App/Models/ItemPedido");
const Cliente = use("App/Models/Cliente");
const Pedido = use("App/Models/Pedido");

class ItemPedidoController {
  async index({ request, response, view }) {}

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

  async show({ params }) {
    const data = await ItemPedido.query()
      .where("pedido_id", params.id)
      .with("produto")
      .fetch();

    return data;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ItemPedidoController;
