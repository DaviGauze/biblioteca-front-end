import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormLivros() {
    const navegacao = useNavigate();
    const { id } = useParams();

    // Declarar um useState para cada campo da tabela
    const [titulo, setTitulo] = useState('');
    const [publicacao, setPublicacao] = useState('');
    const [idcategoria, setCategoria] = useState('');
    const [paginas, setPaginas] = useState('');
    const [ideditora, setEditora] = useState('');
    const [edicao, setEdicao] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [editoras, setEditoras] = useState([]);

    const voltar = () => {
        navegacao('/listalivros');
    };

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro/${id}`);
        setTitulo(data.titulo);
        setPublicacao(data.publicacao);
        setCategoria(data.idcategoria);
        setEditora(data.ideditora);
        setEdicao(data.edicao);
        setPaginas(data.paginas);
    };

    const alterar = async () => {
        let body = {
            "titulo": titulo,
            "publicacao": publicacao,
            "paginas": paginas,
            "idcategoria": Number(idcategoria),
            "ideditora": Number(ideditora),
            "edicao": edicao,
        };

        await axios.put(`http://localhost:4000/livro/${id}`, body);
        voltar();
    };

    const inserir = async () => {
        let body = {
            "titulo": titulo,
            "publicacao": publicacao,
            "paginas": paginas,
            "idcategoria": Number(idcategoria),
            "ideditora": Number(ideditora),
            "edicao": edicao,
        };

        await axios.post(`http://localhost:4000/livro`, body);
        voltar();
    };

    useEffect(() => {
        const carregarCategorias = async () => {
            const { data } = await axios.get('http://localhost:4000/categoria');
            setCategorias(data);
        };
        const carregarEditoras = async () => {
            const { data } = await axios.get('http://localhost:4000/editora');
            setEditoras(data);
        };
        carregarCategorias();
        carregarEditoras();

        if (id) {
            selecionar();
        }
    }, [id]);

    const excluir = async () => {
        await axios.delete(`http://localhost:4000/livro/${id}`);
        voltar();
    };

    const salvar = async () => {
        if (id) {
            alterar();
        } else {
            inserir();
        }
    };

    return (
        <>
            <TituloCadastro id={id} titulo="Livros" />

            <form>
                <div className="mb-3">
                    <label className="form-label">Id</label>
                    <input
                        type="text"
                        className="form-control"
                        value={id || ''}
                        disabled
                    />
                    <div className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(evento) => setTitulo(evento.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Publicação</label>
                    <input
                        type="text"
                        className="form-control"
                        value={publicacao}
                        onChange={(evento) => setPublicacao(evento.target.value)}
                    />
                </div>
                    <div className="mb-3">
                    <label className="form-label">Numero de Paginas</label>
                    <input
                        type="text"
                        className="form-control"
                        value={paginas}
                        onChange={(evento) => setPaginas(evento.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <select
                        className="form-control"
                        value={idcategoria}
                        onChange={(evento) => setCategoria(evento.target.value)}
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat.idcategoria} value={cat.idcategoria}>
                                {cat.nomecategoria}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Editora</label>
                    <select
                        className="form-control"
                        value={ideditora}
                        onChange={(evento) => setEditora(evento.target.value)}
                    >
                        <option value="">Selecione uma Editora</option>
                        {editoras.map((edit) => (
                            <option key={edit.ideditora} value={edit.ideditora}>
                                {edit.nomeeditora}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Edição</label>
                    <input
                        type="text"
                        className="form-control"
                        value={edicao}
                        onChange={(evento) => setEdicao(evento.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={salvar}>
                    Salvar
                </button>
                <button type="button" className="btn btn-secondary" onClick={voltar}>
                    Cancelar
                </button>
                {id && (
                    <button type="button" className="btn btn-danger" onClick={excluir}>
                        Excluir
                    </button>
                )}
            </form>
        </>
    );} 