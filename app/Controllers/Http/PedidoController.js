"use strict";

const Database = use("Database");
const Pedido = use("App/Models/Pedido");
const Produto = use("App/Models/Produto");
const Comissao = use("App/Models/Comissao");

class PedidoController {
  async index() {
    const data = await Pedido.query()
      .table("pedidos")
      .orderBy("created_at", "desc")
      .with("cliente")
      .with("item_pedido")
      .where("status", "aberto")
      .fetch();

    return data;
  }

  async store({ request }) {
    const data = request.only([
      "valor_pago",
      "valor_total",
      "status",
      "cliente_id",
      "entregue",
    ]);

    const itens_pedido = request.input("itens");

    const porcentagem_comissao = request.input("porcentagem_comissao");
    const meta = request.input("meta");
    const funcionario_id = request.input("funcionario_id");

    const valor_comissao = data.valor_total * (porcentagem_comissao / 100);

    const trx = await Database.beginTransaction();

    itens_pedido.map(async (item) => {
      await Database.table("produtos")
        .where("id", item.produto_id)
        .decrement("qtd_atual", item.quantidade, trx);
    });

    const pedido = await Pedido.create(data, trx);
    await pedido.item_pedido().createMany(itens_pedido, trx);

    const now = new Date();

    const dia = now.getDate();

    const mes = now.getMonth() + 1;

    let ano = now.getFullYear();

    const dataHoje = `${ano}-${mes}-${dia}`;

    const data_inicial = `${ano}-${mes}-01`;

    let novoMes = mes + 1;

    if (novoMes === 13) {
      novoMes = 1;
      ano = ano + 1;
    }

    const data_final = `${ano}-${novoMes}-01`;

    const sumComissao = await Database.from("comissaos", trx)
      .sum("valor_total")
      .where("criacao", ">=", data_inicial)
      .where("criacao", "<", data_final);

    const totalComissao =
      parseInt(sumComissao[0].sum) + parseInt(valor_comissao);

    let isvalid = false;

    if (totalComissao >= meta) {
      await Database.table("comissaos", trx)
        .where("criacao", ">=", data_inicial)
        .where("criacao", "<", data_final)
        .update("isvalid", true);
      isvalid = true;
    } else {
      console.log("NÃO bati a meta!");
    }

    const comissao = {
      valor_total: valor_comissao,
      valor_pago: 0,
      valor_receber: 0,
      isvalid: isvalid,
      status: "aberta",
      pedido_id: pedido.id,
      usuario_id: funcionario_id,
      criacao: dataHoje,
    };

    await Comissao.create(comissao, trx);

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
