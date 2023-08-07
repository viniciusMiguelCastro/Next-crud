import Cliente from "@/core/Cliente"
import { editIcon, trashIcon } from "./Icons"

interface TabelaProps {
    clintes: Cliente[],
    clienteSelecionado?: (cliente: Cliente) => void,
    clienteExcluido?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {
    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado

    function renderizarCabecalho() {
        return (
            <tr>
                <th className={`text-left p-4`}>Código</th>
                <th className={`text-left p-4`}>Nome</th>
                <th className={`text-left p-4`}>Idade</th>
                {exibirAcoes ? <th className={`p-4`}>Ações</th> : false}
            </tr>
        )
    }

    function renderizarDados() {
        return props.clintes?.map((cliente, index) => {
            return (
                <tr key={cliente.Id}
                    className={index % 2 === 0 ? `bg-purple-300` : 'bg-purple-200'}
                >
                    <td className={`text-left p-4`}>{cliente.Id}</td>
                    <td className={`text-left p-4`}>{cliente.Nome}</td>
                    <td className={`text-left p-4`}>{cliente.Idade}</td>
                    {exibirAcoes ? renderizarAcoes(cliente) : false}
                </tr>
            )
        })
    }

    function renderizarAcoes(cliente: Cliente) {
        return (
            <td className={`flex justify-center`}>
                {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)} className={`flex justify-center items-center
                        text-green-600 rounded-full p-2 m-1
                        hover:bg-purple-100
                    `}>
                        {editIcon}
                    </button>
                ) : false}

                {props.clienteExcluido ? (
                    <button onClick={() => props.clienteExcluido?.(cliente)} className={`flex justify-center items-center
                        text-red-600 rounded-full p-2 m-1
                        hover:bg-purple-100
                    `}>
                        {trashIcon}
                    </button>
                ) : false}
            </td>
        )
    }

    return (
        <table className={`w-full rounded-xl overflow-hidden`}>
            <thead className={`text-white
                bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900
            `}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>

        </table>
    )
}