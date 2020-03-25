"use strict";

const Database = use("Database");
const Pedido = use("App/Models/Pedido");

class PedidoController {
  async index() {
    const data = await Pedido.query()
      .table("pedidos")
      .orderBy("created_at", "desc")
      .with("cliente")
      .with("item_pedido")
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

  async show({ params }) {
    const data = await Pedido.query()
      .with("cliente")
      .with("item_pedido")
      .where("id", params.id)
      .fetch();

    return data;
  }

  async update({ params, request }) {
    const pedido = await Pedido.findOrFail(params.id);
    const data = request.only(["valor_pago", "status"]);

    data.valor_pago = parseInt(data.valor_pago) + parseInt(pedido.valor_pago);

    if (data.valor_pago >= pedido.valor_total) {
      data.status = "pago";
    } else {
      data.status = "aberto";
    }

    pedido.merge(data);
    await pedido.save();

    return pedido;
  }

  async destroy({ params }) {
    const pedido = await Pedido.findOrFail(params.id);

    await pedido.delete();
  }
}

module.exports = PedidoController;
