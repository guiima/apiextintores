"use strict";

const Database = use("Database");
const Orcamento = use("App/Models/Orcamento");
const Pedido = use("App/Models/Pedido");

class PedidoOrcamentoController {
  async index() {}

  async store({ request }) {
    const data = request.only([
      "valor_pago",
      "valor_total",
      "status",
      "cliente_id",
    ]);

    const orcamento_id = request.input("orcamento_id");

    const itens_pedido = request.input("itens");

    const trx = await Database.beginTransaction();

    itens_pedido.map(async (item) => {
      await Database.table("produtos")
        .where("id", item.produto_id)
        .decrement("qtd_atual", item.quantidade, trx);
    });

    const pedido = await Pedido.create(data, trx);
    await pedido.item_pedido().createMany(itens_pedido, trx);

    const orcamento = await Orcamento.findOrFail(orcamento_id, trx);

    const dataOrcamento = {
      status: "efetuado",
    };

    orcamento.merge(dataOrcamento, trx);

    await orcamento.save(trx);

    await trx.commit();

    return pedido;
  }

  async show({ params }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = PedidoOrcamentoController;
