"use strict";

const Cliente = use("App/Models/Cliente");

class ClienteController {
  async index() {
    const data = await Cliente.query()
      .where("status", true)
      .with("usuario")
      .fetch();

    return data;
  }

  async store({ request }) {
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

    const cliente = await Cliente.create(data);

    return cliente;
  }

  async show({ params }) {
    const data = await Cliente.query()
      .with("usuario")
      .where("id", params.id)
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

  async destroy({ params }) {
    const usuario = await Cliente.findOrFail(params.id);

    await usuario.delete();
  }
}

module.exports = ClienteController;
