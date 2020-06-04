"use strict";

const Pedido = use("App/Models/Pedido");
const Cliente = use("App/Models/Cliente");

class CargaController {
  async index() {
    const data = await Pedido.query()
      .table("pedidos")
      .orderBy("created_at", "desc")
      .with("cliente")
      .with("item_pedido")
      .where("status", "aberto")
      .where("entregue", false)
      .fetch();

    return data;
  }

  async pesquisaPorCpf() {}

  async pesquisaPorEndereco() {}

  async pesquisaPorData() {}
}

module.exports = CargaController;
