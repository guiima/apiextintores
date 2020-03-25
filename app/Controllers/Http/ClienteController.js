"use strict";

const Database = use("Database");
const Cliente = use("App/Models/Cliente");

class ClienteController {
  async index() {
    const data = await Cliente.query()
      .where("status", true)
      .with("usuario")
      .with("telefone")
      .with("email")
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

    const telefones = request.input("telefone");

    const emails = request.input("email");

    const trx = await Database.beginTransaction();

    const cliente = await Cliente.create(data, trx);
    await cliente.telefone().createMany(telefones, trx);
    await cliente.email().createMany(emails, trx);

    await trx.commit();

    return cliente;
  }

  async show({ params }) {
    const data = await Cliente.query()
      .with("usuario")
      .with("telefone")
      .with("email")
      .where("id", params.id)
      .fetch();

    return data;
  }

  async update({ params, request }) {
    const cliente = await Cliente.query()
      .with("usuario")
      .with("telefone")
      .with("email")
      .where("id", params.id)
      .first()
      .fetch();

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
