import Cliente from '../core/Cliente'

import {IconeEdicao} from '../components/Icones'
import {IconeLixo} from '../components/Icones'

interface TabelaProps {
  clientes: Cliente[]
  clienteSelecionado?: (cliente: Cliente) => void
  clienteExcluido?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

  const exibirAcoes = props.clienteSelecionado || props.clienteExcluido

  function renderizarCabecalho() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        {exibirAcoes ? <th className="p-4">Ações</th> : false}
      </tr> 
    )
  }

  function renderizarDados() {
    return props.clientes?.map((cliente, i) => {
        return (
          <tr key={cliente.id}
            className={`${i % 2 === 0 ? 'bg-green-100' : 'bg-green-50'}`}
          >
            <td className="text-left p-4">{cliente.id}</td>
            <td className="text-left p-4">{cliente.nome}</td>
            <td className="text-left p-4">{cliente.idade}</td>
            {exibirAcoes ? renderizarAcoes(cliente) : false}
          </tr>
        )
      })
  }

  function renderizarAcoes(cliente: Cliente) {
    return (
      <td className="flex justify-center">
        {props.clienteSelecionado ? (
          <button onClick={() => props.clienteSelecionado?.(cliente)} className={`
            flex justify-center items-center 
            text-green-600 rounded-full p-2 m-1
            hover:bg-green-200`}
          >
            {IconeEdicao}
          </button>
        ) : false }

        {props.clienteExcluido ? (
          <button onClick={() => props.clienteExcluido?.(cliente)} className={`
            flex justify-center items-center 
            text-red-500 rounded-full p-2 m-1
            hover:bg-red-50`}
          >
            {IconeLixo}
          </button>
        ) : false }
      </td>
    )
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className={`
        bg-gradient-to-r from-green-700 to-green-500
        text-green-50
      `}>
        {renderizarCabecalho()}
      </thead>
      <tbody>
        {renderizarDados()}
      </tbody>
    </table>
  )
}