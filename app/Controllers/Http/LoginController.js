"use strict";

const Usuario = use("App/Models/Usuario");

class LoginController {
  async login({ request, response }) {
    const { login, senha } = request.only(["login", "senha"]);

    const usuario = await Usuario.findByOrFail("login", login);

    if (usuario.senha === senha && usuario.status) {
      return usuario;
    }

    return response.status(404);
  }
}

module.exports = LoginController;
