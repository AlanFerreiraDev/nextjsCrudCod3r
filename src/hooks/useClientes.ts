import { useEffect, useState } from 'react'
import ColecaoCliente from '../backend/db/ColecaoCliente'
import Cliente from '../core/Cliente'
import ClienteRepositorio from '../core/ClienteRepositorio'
import useTabelaOuForm from './useTabelaOuForm'


export default function useClientes() {

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])

  //Integracao Firebase e APP
  const repo: ClienteRepositorio = new ColecaoCliente()

  //Hook Visualização tabela ou Form
  const { tabelaVisivel, exibirFormulario, formularioVisivel, exibirTabela} = useTabelaOuForm()

  useEffect(obterTodos, [])

  // Modelo para testar os clientes mockados
  // const clientes = [
  //   new Cliente("Ana", 34, '1'),
  //   new Cliente("João", 23, '2'),
  //   new Cliente("Carlos", 19, '3'),
  //   new Cliente("Janaína", 57, '4')
  // ]

  function obterTodos() {
    repo.obterTodos()
      .then(clientes => {
        setClientes(clientes)
        exibirTabela()
      })
  }

  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente)
    exibirFormulario()
  }

  async function excluirCliente(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }

  function novoCliente() {
    setCliente(Cliente.vazio())
    exibirFormulario()
  }

  return {
    cliente,
    clientes,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
    tabelaVisivel,
    formularioVisivel,
    exibirFormulario,
    exibirTabela,
  }
}