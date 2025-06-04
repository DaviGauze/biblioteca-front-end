import { useNavigate, useParams} from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormFuncionario(){

    const navegacao = useNavigate();
    const { id } = useParams();    
    //Declarar um useState para cada campo da tabela
    const [nomefuncionario, setNomeFuncionario] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCPF] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [salario, setSalario] = useState('');
    const [contratacao, setContratacao] = useState('');
    const [demissao, setDemissao] = useState('');
    const [ativo, setAtivo] = useState('');
    const [senha, setSenha] = useState('');
    const [token, setToken] = useState('');

    const voltar = () => {
        navegacao('/listafuncionarios');
    }

    const selecionar = async () => {
      let { data } = await axios.get(`http://localhost:4000/funcionario/${id}`);
      //Carregar cada campo em sua respectiva variavel
        setNomeFuncionario(data.nomefuncionario);
        setEmail(data.email);
        setTelefone(data.telefone);
        setCPF(data.cpf);
        setNascimento(data.nascimento);
        setSalario(data.salario);
        setContratacao(data.contratacao);
        setDemissao(data.demissao);
        setAtivo(data.ativo);
        setSenha(data.senha);
        setToken(data.token);
    };

    const alterar = async () => {
        //Montar o JSON do body com todos os campos que precisam ser enviados
        let body = {
            "nomefuncionario": nomefuncionario,
            "cpf": cpf,
            "email": email,
            "telefone": telefone,
            "nascimento": nascimento,
            "salario": salario,
            "contratacao": contratacao,
            "demissao": demissao,
            "ativo": ativo,
            "senha": senha,
            "token": token
        };

        await axios.put(`http://localhost:4000/funcionario/${id}`, body);
        voltar();
    };
    
    const inserir = async () => {
        let body = {
            "nomefuncionario": nomefuncionario,
            "cpf": cpf,
            "email": email,
            "telefone": telefone,
            "nascimento": nascimento,
            "salario": salario,
            "contratacao": contratacao,
            "demissao": demissao,
            "ativo": ativo,
            "senha": senha,
            "token": token
        };

        await axios.post(`http://localhost:4000/funcionario`, body);
        voltar();
    };

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    const excluir = async () => {
      await axios.delete(`http://localhost:4000/funcionario/${id}`);
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

        <TituloCadastro id={id} titulo="Funcionario"/>

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
            Nome do Funcionario
            </label>
            <input
            type="text"
            className="form-control"
            value={nomefuncionario}
            onChange={(evento) => setNomeFuncionario(evento.target.value)}
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
                        <div className="mb-3">
        <label className="form-label">
        Salário
        </label>
            <textarea className="form-control"
            value={salario}
            onChange={(evento) => setSalario(evento.target.value)}
        />
                        <div className="mb-3">
        <label className="form-label">
        Contratação
        </label>
            <textarea className="form-control"
            value={contratacao}
            onChange={(evento) => setContratacao(evento.target.value)}
        />
                        <div className="mb-3">
        <label className="form-label">
        demissao
        </label>
            <textarea className="form-control"
            value={demissao}
            onChange={(evento) => setDemissao(evento.target.value)}
        />
                        <div className="mb-3">
        <label className="form-label">
        Ativo
        </label>
            <textarea className="form-control"
            value={ativo}
            onChange={(evento) => setAtivo(evento.target.value)}
        />
                        <div className="mb-3">
        <label className="form-label">
        Senha
        </label>
            <textarea className="form-control"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
        />
                        <div className="mb-3">
        <label className="form-label">
        Token
        </label>
            <textarea className="form-control"
            value={token}
            onChange={(evento) => setToken(evento.target.value)}
        />
        </div>
        </div>
        </div>
        </div>
        </div>
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
