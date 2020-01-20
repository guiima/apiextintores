"use strict";

const Acessorio = use("App/Models/Produto");

class UsuarioController {
  async index() {
    const data = await Acessorio.query()
      .where("status", true)
      .where("categoria", "acessorio")
      .fetch();

    return data;
  }

  async store({ request }) {
    const data = request.only([
      "nome",
      "valor",
      "qtd_atual",
      "qtd_minima",
      "categoria",
      "status"
    ]);

    const usuario = await Acessorio.create(data);

    return usuario;
  }

  async show({ params }) {
    const data = await Acessorio.findOrFail(params.id);

    return data;
  }

  async update({ params, request }) {
    const usuario = await Acessorio.findOrFail(params.id);
    const data = request.only([
      "nome",
      "valor",
      "qtd_atual",
      "qtd_minima",
      "categoria",
      "status"
    ]);

    usuario.merge(data);
    await usuario.save();

    return usuario;
  }

  async destroy({ params }) {
    const usuario = await Acessorio.findOrFail(params.id);

    await usuario.delete();
  }
}

module.exports = UsuarioController;
