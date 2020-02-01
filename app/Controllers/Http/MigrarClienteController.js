"use strict";

const Cliente = use("App/Models/Cliente");

class MigrarClienteController {
  async show({ params }) {
    const data = await Cliente.query()
      .where("usuario_id", params.id)
      .with("usuario")
      .fetch();

    return data;
  }

  async update({ params, request }) {
    const cliente = await Cliente.findOrFail(params.id);
    const data = request.only([
      "nome_fantasia",
      "razao_social",
      "tipo_pessoa",
      "metragem",
      "cpf",
      "cnpj",
      "endereco",
      "cep",
      "mei",
      "data_nascimento",
      "responsavel",
      "observacao",
      "inscricao_estadual",
      "privado",
      "status",
      "usuario_id"
    ]);

    cliente.merge(data);
    await cliente.save();

    return cliente;
  }
}

module.exports = MigrarClienteController;
