import { useNavigate, useParams} from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormAutor(){

    const navegacao = useNavigate();
    const { id } = useParams();    
    //Declarar um useState para cada campo da tabela
    const [nomeautor, setNomeAutor] = useState('');
    const [nascimento, setNascimentoAutor] = useState('');
    const [biografia, setBiografiaAutor] = useState('');
    const [nacionalidade, setNacionalidadeAutor] = useState('');
    const [foto, setFotoAutor] = useState('');

    const voltar = () => {
        navegacao('/listaautor');
    }

    const selecionar = async () => {
      let { data } = await axios.get(`http://localhost:4000/autor/${id}`);
      //Carregar cada campo em sua respectiva variavel
        setNomeAutor(data.nomeautor);
        setNascimentoAutor(data.nascimento);
        setBiografiaAutor(data.biografia);
        setNacionalidadeAutor(data.nacionalidade);
        setFotoAutor(data.foto);
    };

    const alterar = async () => {
        //Montar o JSON do body com todos os campos que precisam ser enviados
        let body = {
            "nomeautor": nomeautor,
            "nascimento": nascimento,
            "biografia": biografia,
            "nacionalidade": nacionalidade,
            "foto": foto
        };

        await axios.put(`http://localhost:4000/autor/${id}`, body);
        voltar();
    };
    
    const inserir = async () => {
        let body = {
            "nomeautor": nomeautor,
            "nascimento": nascimento,
            "biografia": biografia,
            "nacionalidade": nacionalidade,
            "foto": foto
        };

        await axios.post(`http://localhost:4000/autor`, body);
        voltar();
    };

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    const excluir = async () => {
      await axios.delete(`http://localhost:4000/autor/${id}`);
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

        <TituloCadastro id={id} titulo="Autor"/>

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
            Nome do Autor
            </label>
            <input
            type="text"
            className="form-control"
            value={nomeautor}
            onChange={(evento) => setNomeAutor(evento.target.value)}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">
        Nascimento
        </label>
        <input
            type="text"
            className="form-control"
            value={nascimento}
            onChange={(evento) => setNascimentoAutor(evento.target.value)}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">
        Biografia
        </label>
            <textarea className="form-control"
            value={biografia}
            onChange={(evento) => setBiografiaAutor(evento.target.value)}
            rows={10}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">
        Nacionalidade
        </label>
        <input
            type="text"
            className="form-control"
            value={nacionalidade}
            onChange={(evento) => setNacionalidadeAutor(evento.target.value)}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">
        Inserir URL da foto do Autor
        </label>
        <input
            type="text"
            className="form-control"
            value={foto}
            onChange={(evento) => setFotoAutor(evento.target.value)}
        />
            
        </div>
        <button type="button" className="btn btn-primary" onClick={() => salvar()}>
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
