"use strict";

const Database = use("Database");
const Cliente = use("App/Models/Cliente");
const Telefone = use("App/Models/Telefone");
const Email = use("App/Models/Email");

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

  async clienteDeConsultor({ params }) {
    const data = await Cliente.query()
      .where("status", true)
      .where("usuario_id", params.id)
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
      "numero_pavimentos",
      "data_nascimento",
      "responsavel",
      "observacao",
      "inscricao_estadual",
      "privado",
      "status",
      "usuario_id",
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
    const cliente = await Cliente.findOrFail(params.id);

    const { telefone, email, ...data } = request.body;

    const trx = await Database.beginTransaction();

    cliente.merge(data, trx);
    await cliente.save();

    await Database.table("telefones", trx)
      .where("cliente_id", cliente.id)
      .delete();

    await Database.table("emails", trx)
      .where("cliente_id", cliente.id)
      .delete();

    const newFones = telefone.map((fone) => ({
      numero: fone.numero,
      whats_app: fone.whats_app,
      cliente_id: fone.cliente_id,
    }));

    const newEmails = email.map((mail) => ({
      email: mail.email,
      cliente_id: mail.cliente_id,
    }));

    await cliente.telefone().createMany(newFones, trx);
    await cliente.email().createMany(newEmails, trx);

    await trx.commit();

    return request.body;
  }

  async destroy({ params }) {
    const usuario = await Cliente.findOrFail(params.id);

    await usuario.delete();
  }
}

module.exports = ClienteController;
