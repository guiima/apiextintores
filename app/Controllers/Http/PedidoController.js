"use strict";

const Database = use("Database");
const Pedido = use("App/Models/Pedido");

class PedidoController {
  async index() {
    const data = await Pedido.query()
      .with("cliente")
      .fetch();

    return data;
  }

  async store({ request }) {
    const data = request.only([
      "valor_pago",
      "valor_total",
      "status",
      "cliente_id"
    ]);
    const itens_pedido = request.input("itens");

    const trx = await Database.beginTransaction();

    const pedido = await Pedido.create(data, trx);
    await pedido.item_pedido().createMany(itens_pedido, trx);

    await trx.commit();

    return pedido;
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = PedidoController;
