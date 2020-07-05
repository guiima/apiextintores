"use strict";

const Database = use("Database");
const Orcamento = use("App/Models/Orcamento");
const Pedido = use("App/Models/Pedido");
const Comissao = use("App/Models/Comissao");

class PedidoOrcamentoController {
  async index() {}

  async store({ request }) {
    const data = request.only([
      "valor_pago",
      "valor_total",
      "status",
      "cliente_id",
      "entregue",
    ]);

    const funcionario_id = request.input("funcionario_id");
    const porcentagem_comissao = request.input("porcentagem_comissao");
    const meta = request.input("meta");

    const valor_comissao = data.valor_total * (porcentagem_comissao / 100);

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

    const now = new Date();

    const dia = now.getDate();

    const mes = now.getMonth() + 1;

    let ano = now.getFullYear();

    const dataHoje = `${ano}-${mes}-${dia}`;

    console.log("dataHoje", dataHoje);

    const comissao = {
      valor_total: valor_comissao,
      valor_pago: 0,
      valor_receber: 0,
      isvalid: false,
      status: "aberta",
      pedido_id: pedido.id,
      usuario_id: funcionario_id,
      criacao: dataHoje,
    };

    await Comissao.create(comissao, trx);

    console.log("mes", mes);
    console.log("ano", ano);

    const data_inicial = `${ano}-${mes}-01`;

    let novoMes = mes + 1;

    if (novoMes === 13) {
      novoMes = 1;
      ano = ano + 1;
    }

    const data_final = `${ano}-${novoMes}-01`;

    const sumComissao = await Database.from("comissaos")
      .sum("valor_total")
      .where("criacao", ">=", data_inicial)
      .where("criacao", "<", data_final);

    const totalComissao =
      parseInt(sumComissao[0].sum) + parseInt(valor_comissao);

    console.log("totalComissao", totalComissao);
    console.log("sumComissao.sum", sumComissao[0].sum);

    console.log("meta", meta);
    if (totalComissao >= meta) {
      console.log("bati a meta caraaaaaaaai!");
    } else {
      console.log("NÃO bati a meta!");
    }

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
