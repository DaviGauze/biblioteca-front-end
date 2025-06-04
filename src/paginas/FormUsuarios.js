import { useNavigate, useParams} from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormUsuario(){

    const navegacao = useNavigate();
    const { id } = useParams();    
    //Declarar um useState para cada campo da tabela
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCPF] = useState('');
    const [nascimento, setNascimento] = useState('');

    const voltar = () => {
        navegacao('/listausuarios');
    }

    const selecionar = async () => {
      let { data } = await axios.get(`http://localhost:4000/usuario/${id}`);
      //Carregar cada campo em sua respectiva variavel
        setNome(data.nome);
        setEmail(data.email);
        setTelefone(data.telefone);
        setCPF(data.cpf);
        setNascimento(data.nascimento);
    };

    const alterar = async () => {
        //Montar o JSON do body com todos os campos que precisam ser enviados
        let body = {
            "nome": nome,
            "email": email,
            "telefone": telefone,
            "cpf": cpf,
            "nascimento": nascimento,
        };

        await axios.put(`http://localhost:4000/usuario/${id}`, body);
        voltar();
    };
    
    const inserir = async () => {
        let body = {
            "nome": nome,
            "email": email,
            "telefone": telefone,
            "cpf": cpf,
            "nascimento": nascimento,
        };

        await axios.post(`http://localhost:4000/usuario`, body);
        voltar();
    };

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    const excluir = async () => {
      await axios.delete(`http://localhost:4000/usuario/${id}`);
      voltar();
    };

    const salvar = async () => {
        if (id) {
            alterar();
        } else {
            inserir();
        }
    }

    return (
        <> 

        <TituloCadastro id={id} titulo="Usuario"/>

        <form>
        <div className="mb-3">
            <label className="form-label">
                Id
            </label>
            <input
            type="text"
            className="form-control"
            value={id}
            />
            <div className="form-text"></div>
        </div>
        <div className="mb-3">
            <label className="form-label">
            Nome do Usuário
            </label>
            <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">
        Email
        </label>
        <input
            type="text"
            className="form-control"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">
        Telefone
        </label>
            <textarea className="form-control"
            value={telefone}
            onChange={(evento) => setTelefone(evento.target.value)}
        />
        </div>
                <div className="mb-3">
        <label className="form-label">
        CPF
        </label>
            <textarea className="form-control"
            value={cpf}
            onChange={(evento) => setCPF(evento.target.value)}
        />
                <div className="mb-3">
        <label className="form-label">
        Nascimento
        </label>
            <textarea className="form-control"
            value={nascimento}
            onChange={(evento) => setNascimento(evento.target.value)}
        />
        </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => salvar()} >
            Salvar
        </button>
        <button type="button" className="btn btn-secondary" 
        onClick={() => voltar()}>    
            Cancelar
        </button>
        { id && (
        <button type="button" className="btn btn-danger" onClick={() => excluir()}>
            Excluir
        </button>
        )}
        </form>
        
        </>
    );
};
