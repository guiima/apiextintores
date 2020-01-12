"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Usuario extends Model {
  cliente() {
    return this.hasMany("App/Models/Cliente");
  }

  comissao() {
    return this.hasMany("App/Models/Comissao");
  }

  auditoria() {
    return this.hasMany("App/Models/Auditoria");
  }
}

module.exports = Usuario;
