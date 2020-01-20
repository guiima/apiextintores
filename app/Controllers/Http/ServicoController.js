"use strict";

const Servico = use("App/Models/Produto");

class UsuarioController {
  async index() {
    const data = await Servico.query()
      .where("status", true)
      .where("categoria", "servico")
      .fetch();

    return data;
  }

  async store({ request }) {
    const data = request.only(["nome", "valor", "status", "categoria"]);

    const usuario = await Servico.create(data);

    return usuario;
  }

  async show({ params }) {
    const data = await Servico.findOrFail(params.id);

    return data;
  }

  async update({ params, request }) {
    const usuario = await Servico.findOrFail(params.id);
    const data = request.only(["nome", "valor", "status", "categoria"]);

    usuario.merge(data);
    await usuario.save();

    return usuario;
  }

  async destroy({ params }) {
    const usuario = await Servico.findOrFail(params.id);

    await usuario.delete();
  }
}

module.exports = UsuarioController;
