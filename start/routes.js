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

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.resource("usuarios", "UsuarioController").apiOnly();

Route.post("login", "LoginController.login");

Route.resource("servicos", "ServicoController").apiOnly();

Route.resource("acessorios", "AcessorioController").apiOnly();

Route.resource("extintores", "ExtintorController").apiOnly();

Route.resource("clientes", "ClienteController").apiOnly();

Route.resource("migrar", "MigrarClienteController").apiOnly();

Route.resource("pedidos", "PedidoController").apiOnly();

Route.resource("produtos", "ProdutoController").apiOnly();

Route.resource("orcamentos", "OrcamentoController").apiOnly();

Route.resource("itempedido", "ItemPedidoController").apiOnly();

Route.resource("itemorcamento", "ItemOrcamentoController").apiOnly();

Route.post("pedidodata", "PesquisaPedidoController.show");

Route.post("pedidodatasoma", "PesquisaPedidoController.sumTotal");

Route.resource("clientepedido", "ClienteItemController").apiOnly();

Route.post("clienteporcpf", "ClienteItemController.buscacpf");

Route.post("buscaEndereco", "ClienteItemController.buscaEndereco");

Route.post("buscadata", "ClienteItemController.buscaData");

Route.get("clienteall/:id", "ClienteItemController.clienteAll");

Route.get("clienteDeConsultor/:id", "ClienteController.clienteDeConsultor");

Route.post("orcamentodata", "PesquisaOrcamentoController.show");

Route.post("pedidoorcamento", "PedidoOrcamentoController.store");

Route.get("carga", "CargaController.index");

Route.post("carga", "CargaController.pedidosEntregues");

Route.get("buscaMangueira", "AcessorioController.buscaMangueira");

Route.post("addCasco", "ExtintorController.addCasco");

Route.resource("comissoes", "ComissaoController").apiOnly();
