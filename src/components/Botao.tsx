interface BotaoProps {
  cor?: 'green' | 'blue' | 'gray'
  className?: string
  children: any
  onClick?: () => void
}

export default function Botao(props: BotaoProps) {
  // const cor = props.cor ?? 'gray'
  return (
    <button onClick={props.onClick} className={`
      bg-gradient-to-r from-${props.cor}-700 to-${props.cor}-900
      text-white px-4 py-2 rounded-full
      ${props.className}
    `}>
      {props.children}
    </button>
  )
}