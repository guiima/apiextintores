"use strict";

const Database = use("Database");
const ItemPedido = use("App/Models/ItemPedido");
const Cliente = use("App/Models/Cliente");

class ItemPedidoController {
  async index({ request, response, view }) {}

  async store({ request, response }) {}

  async show({ params, request }) {
    // const data = Database.table("pedidos")
    //   .innerJoin("item_pedidos", "pedidos.id", "item_pedidos.pedido_id")
    //   .where("pedidos.id", params.id);

    // return data;

    // const data = await ItemPedido.query()
    //   .where("pedido_id", params.id)
    //   .with("produto")
    //   .with("pedido", pedido => {
    //     pedido.where("id", params.id).with("cliente");
    //   })
    //   .fetch();

    // return data;

    const { nome_fantasia } = request.only(["nome_fantasia"]);

    const data = await Cliente.query()
      .where("nome_fantasia", "like", `%${nome_fantasia}%`)
      .with("pedido", pedido => {
        pedido
          .innerJoin("item_pedidos", "pedidos.id", "item_pedidos.pedido_id")
          .with("item_pedido", item => {
            item.with("produto");
          });
      })
      .fetch();

    return data;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ItemPedidoController;
