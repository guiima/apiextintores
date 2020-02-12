"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })

Route.resource("usuarios", "UsuarioController").apiOnly();

Route.post("login", "LoginController.login");

Route.resource("servicos", "ServicoController").apiOnly();

Route.resource("acessorios", "AcessorioController").apiOnly();

Route.resource("extintores", "ExtintorController").apiOnly();

Route.resource("clientes", "ClienteController").apiOnly();

Route.resource("migrar", "MigrarClienteController").apiOnly();

Route.resource("pedidos", "PedidoController").apiOnly();

Route.resource("orcamentos", "OrcamentoController").apiOnly();
