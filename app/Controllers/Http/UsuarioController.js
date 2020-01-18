"use strict";

const Usuario = use("App/Models/Usuario");

class UsuarioController {
  async index() {
    const data = await Usuario.query()
      .where("status", true)
      .fetch();

    return data;
  }

  async store({ request }) {
    const data = request.only(["nome", "login", "senha", "tipo", "status"]);

    const usuario = await Usuario.create(data);

    return usuario;
  }

  async show({ params }) {
    const data = await Usuario.findOrFail(params.id);

    return data;
  }

  async update({ params, request }) {
    const usuario = await Usuario.findOrFail(params.id);
    const data = request.only(["nome", "login", "senha", "tipo", "status"]);

    usuario.merge(data);
    await usuario.save();

    return usuario;
  }

  async destroy({ params }) {
    const usuario = await Usuario.findOrFail(params.id);

    await usuario.delete();
  }
}

module.exports = UsuarioController;
