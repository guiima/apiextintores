"use strict";

const Extintor = use("App/Models/Produto");

class UsuarioController {
  async index() {
    const data = await Extintor.query()
      .where("status", true)
      .where("categoria", "extintor")
      .fetch();

    return data;
  }

  async store({ request }) {
    const data = request.only([
      "tipo",
      "classe",
      "carga_nominal",
      "peso",
      "valor",
      "qtd_atual",
      "qtd_minima",
      "validade",
      "situacao",
      "categoria",
      "status"
    ]);

    const usuario = await Extintor.create(data);

    return usuario;
  }

  async show({ params }) {
    const data = await Extintor.findOrFail(params.id);

    return data;
  }

  async update({ params, request }) {
    const usuario = await Extintor.findOrFail(params.id);
    const data = request.only([
      "tipo",
      "classe",
      "carga_nominal",
      "peso",
      "valor",
      "qtd_atual",
      "qtd_minima",
      "validade",
      "situacao",
      "categoria",
      "status"
    ]);

    usuario.merge(data);
    await usuario.save();

    return usuario;
  }

  async destroy({ params }) {
    const usuario = await Extintor.findOrFail(params.id);

    await usuario.delete();
  }
}

module.exports = UsuarioController;
