"use strict";

const ItemPedido = use("App/Models/ItemPedido");

class ItemPedidoController {
  async index({ request, response, view }) {}

  async store({ request, response }) {}

  async show({ params }) {
    const data = await ItemPedido.query()
      .where("pedido_id", params.id)
      .fetch();

    return data;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ItemPedidoController;
