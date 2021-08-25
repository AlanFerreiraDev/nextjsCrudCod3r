import { useState } from 'react'
import Entrada from "./Entrada";
import Cliente from '../core/Cliente'
import Botao from './Botao';

interface FormularioProps {
  cliente: Cliente
  clienteMudou?: (cliente: Cliente) => void
  cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
  // Para verificar se o cliente existe mesmo, e se tem id 
  const id = props.cliente?.id
  const [nome, setNome] = useState(props.cliente?.nome ?? '')
  const [idade, setIdade] = useState(props.cliente?.idade ?? 0)

  return (
    <div>
      {id ? (
        <Entrada 
          somenteLeitura
          texto="Código" 
          valor={id}
          className="mb-4"
        />
      ) : false }
      <Entrada 
        texto="Nome" 
        valor={nome} 
        valorMudou={setNome}
        className="mb-4"
      />
      <Entrada 
        texto="Idade" 
        tipo="number" 
        valor={idade} 
        valorMudou={setIdade}
      />
      <div 
        className="flex justify-end mt-5" 
        onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id)) }
      >
        <Botao cor="blue" className="mr-2">
          {id ? 'Alterar' : 'Salvar'}
        </Botao>
        <Botao 
          cor="gray"
          onClick={props.cancelado}  
        >
          Cancelar
        </Botao>
      </div>
    </div>
  )
}