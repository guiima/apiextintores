"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Produto = use("App/Models/Produto");

class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const produto = await Produto.all();

    return produto;
  }

  async store({ request, response }) {}

  async show({ params }) {
    const data = await Produto.findOrFail(params.id);

    return data;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ProdutoController;
