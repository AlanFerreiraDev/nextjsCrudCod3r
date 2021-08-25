import Cliente from '../../core/Cliente'
import ClienteRepositorio from '../../core/ClienteRepositorio'
import firebase from '../config'

export default class ColecaoCliente implements ClienteRepositorio {

  // Estamos usando esse método do Firestore, par acopnverter uma classe Cliente em um objeto que o Firestore consiga ler e interpretar, pois eu não posso mandar direto a classe
  #conversor = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade
      }
    },
    // E aqui eu recebo os dados do firebase e transformo em um Cliente novamente
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) : Cliente {
      const dados = snapshot.data(options)
      return new Cliente(dados.nome, dados.idade, snapshot.id)
    }
  }

  async salvar(cliente: Cliente) : Promise<Cliente> {
    //Alterar
    if (cliente?.id) {
      await this.colecao().doc(cliente.id).set(cliente)
      return cliente
      // Salvar
    } else {
      const docRef = await this.colecao().add(cliente)
      const doc = await docRef.get()
      return doc.data()
    }
  }

  async excluir(cliente: Cliente) : Promise<void> {
    return this.colecao().doc(cliente.id).delete()
  }

  async obterTodos() : Promise<Cliente[]> {
    const query = await this.colecao().get()
    return query.docs.map(doc => doc.data()) ?? []
  }

  //Método para utilizar a coleção de cliente socmo conversor feito acima
  private colecao() {
    return firebase.firestore().collection('clientes').withConverter(this.#conversor)
  }
}