import { useState } from "react";
import Input from "./Input";
import Cliente from "@/core/Cliente";
import Botao from "./Botao";

interface FormularioProps {
    cliente: Cliente,
    clienteMudou?: (cliente: Cliente) => void,
    cancelado?: () => void,
}

export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.Id
    const [nome, setNome] = useState(props.cliente?.Nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.Idade ?? 0)

    return (
        <div>
            {id ? (
                <Input texto="Código" valor={id} somenteLeitura className="mb-4" />
            ) : false}
            <Input texto="Nome" valor={nome} onChange={setNome} className="mb-4" />
            <Input texto="Idade" tipo="number" valor={idade} onChange={setIdade} />
            <div className={`flex justify-end mt-7`}>
                <Botao cor="blue" className={`mr-2`}
                    onClick={() => props.clienteMudou?.(new Cliente(nome, idade, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}