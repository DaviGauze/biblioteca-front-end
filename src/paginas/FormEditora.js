import { useNavigate, useParams} from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormEditora(){

    const navegacao = useNavigate();
    const { id } = useParams();    
    //Declarar um useState para cada campo da tabela
    const [nomeeditora, setNomeEditora] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cnpj, setCnpj] = useState('');

    const voltar = () => {
        navegacao('/listaeditora');
    }

    const selecionar = async () => {
      let { data } = await axios.get(`http://localhost:4000/editora/${id}`);
      //Carregar cada campo em sua respectiva variavel
        setNomeEditora(data.nomeeditora);
        setEndereco(data.enedereco);
        setCnpj(data.cnpj);
    };

    const alterar = async () => {
        //Montar o JSON do body com todos os campos que precisam ser enviados
        let body = {
            "nomeeditora": nomeeditora,
            "endereco": endereco,
            "cnpj": cnpj,
        };

        await axios.put(`http://localhost:4000/editora/${id}`, body);
        voltar();
    };
    
    const inserir = async () => {
        let body = {
            "nomeeditora": nomeeditora,
            "endereco": endereco,
            "cnpj": cnpj,
        };

        await axios.post(`http://localhost:4000/editora`, body);
        voltar();
    };

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    const excluir = async () => {
      await axios.delete(`http://localhost:4000/editora/${id}`);
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

        <TituloCadastro id={id} titulo="Editora"/>

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
            Nome da Editora
            </label>
            <input
            type="text"
            className="form-control"
            value={nomeeditora}
            onChange={(evento) => setNomeEditora(evento.target.value)}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">
        Endereço
        </label>
        <input
            type="text"
            className="form-control"
            value={endereco}
            onChange={(evento) => setEndereco(evento.target.value)}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">
        CNPJ
        </label>
            <textarea className="form-control"
            value={cnpj}
            onChange={(evento) => setCnpj(evento.target.value)}
        />
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
