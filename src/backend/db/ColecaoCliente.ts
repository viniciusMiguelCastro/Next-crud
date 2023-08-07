import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import firebase from "../config";

export default class ColecaoCliente implements ClienteRepositorio {
    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.Nome,
                idade: cliente.Idade,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot?.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot?.id)
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if (cliente?.Id) {
            await this.#colecao().doc(cliente.Id).set(cliente)
            return cliente
        }
        else {
            const docRef = await this.#colecao().add(cliente)
            const doc = await docRef.get()
            return doc.data()
        }
    }

    async exlcuir(cliente: Cliente): Promise<void> {
        return this.#colecao().doc(cliente.Id).delete()
    }

    async obterTodos(): Promise<Cliente[]> {
        const quey = await this.#colecao().get()
        return quey.docs.map(doc => doc.data()) ?? []
    }

    #colecao() {
        return firebase.firestore().collection('clientes').withConverter(this.#conversor)
    }
}