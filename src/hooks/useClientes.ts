import ColecaoCliente from "@/backend/db/ColecaoCliente"
import Cliente from "@/core/Cliente"
import ClienteRepositorio from "@/core/ClienteRepositorio"
import { useEffect, useState } from "react"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente()

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
    const [clientes, setClientes] = useState<Cliente[]>([])
    const { exibirForm, exibirTabela, tabelaVisivel } = useTabelaOuForm()

    useEffect(() => {
        obterTodos
    }, [])

    function obterTodos() {
        repo.obterTodos().then(clientes => {
            setClientes(clientes)
            exibirTabela()
        })
    }

    function novoCliente() {
        setCliente(Cliente.vazio())
        exibirForm()
    }

    function selecionarCliente(cliente: Cliente) {
        setCliente(cliente)
        exibirForm()
    }

    async function exlcuirCliente(cliente: Cliente) {
        await repo.exlcuir(cliente)
        obterTodos()
    }

    async function salvarCliente(cliente: Cliente) {
        await repo.salvar(cliente)
        obterTodos()
    }

    return {
        cliente,
        clientes,
        obterTodos,
        novoCliente,
        selecionarCliente,
        exlcuirCliente,
        salvarCliente,
        tabelaVisivel,
        exibirTabela
    }
}