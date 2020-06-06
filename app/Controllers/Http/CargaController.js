"use strict";

const Pedido = use("App/Models/Pedido");
const Cliente = use("App/Models/Cliente");
const Database = use("Database");

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

  async pedidosEntregues({ request }) {
    const { itens } = request.only(["itens"]);

    itens.map(async (item) => {
      await Database.table("pedidos")
        .where("id", item)
        .update("entregue", "true");
    });
  }
}

module.exports = CargaController;
