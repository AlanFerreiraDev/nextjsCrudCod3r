// A # foi usada pq o nome do get é o mesmo do atributo, assim nçao preciso usar o private na classe

export default class Cliente {
   #id: string
   #nome: string
   #idade: number

  constructor(nome: string, idade: number, id: string = null) {
    this.#id = id
    this.#nome = nome
    this.#idade = idade
  }

  // Método estático para criação de cliente vazio
  static vazio() {
    return new Cliente('', 0)
  }

  get id() {
    return this.#id
  }

  get idade() {
    return this.#idade
  }

  get nome() {
    return this.#nome
  }

}