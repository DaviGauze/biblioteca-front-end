import { useState, useEffect } from "react";
import axios from "axios";

export default function ListaLivrosPainel() {
    const [categorias, setCategorias] = useState([]);
    const [categoriaAtiva, setCategoriaAtiva] = useState(null);
    const [livros, setLivros] = useState([]);
    const [editoras, setEditoras] = useState([]);

    const listarCategorias = async () => {
        let { data } = await axios.get('http://localhost:4000/categoria');
        setCategorias(data);
    };

    const listarEditoras = async () => {
        let { data } = await axios.get('http://localhost:4000/editora');
        setEditoras(data);
    };

    const listarLivros = async (idcategoria = null) => {
        let { data } = await axios.get('http://localhost:4000/livro');
        if (idcategoria) {
            data = data.filter(livro => livro.idcategoria === idcategoria);
        }
        setLivros(data);
    };

    useEffect(() => {
        listarCategorias();
        listarEditoras();
        listarLivros();
    }, []);

    const selecionarCategoria = (idcategoria) => {
        setCategoriaAtiva(idcategoria);
        listarLivros(idcategoria);
    };

    const NomeEditora = (id) => {
        const edit = editoras.find(e => e.ideditora === id);
        return edit ? edit.nomeeditora : id;
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        {categorias.map(cat => (
                            <button
                                key={cat.idcategoria}
                                className={`btn btn-primary btn-lg m-2${categoriaAtiva === cat.idcategoria ? " active" : ""}`}
                                onClick={() => selecionarCategoria(cat.idcategoria)}
                            >
                                {cat.nomecategoria}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <h4>
                            {categoriaAtiva
                                ? "Livros da categoria selecionada"
                                : "Todos os livros"}
                        </h4>
                        <div className="row">
                            {livros.map(livro => (
                                <div className="col-md-4 mb-4" key={livro.idlivro}>
                                    <div className="card h-100">
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{livro.titulo}</h5>
                                            <div className="mb-2">Editora: {NomeEditora(livro.ideditora)}</div>
                                            <div className="mb-2">Edição {livro.edicao}</div>
                                            <div className="mb-2">Publicado em {livro.publicacao}</div>
                                            <div className="mb-2">N. páginas {livro.paginas}</div>
                                             <div className="mt-auto">
                                                {livro.emprestado
                                                    ? <span className="btn btn-info w-100" disabled>Emprestado!</span>
                                                    : <a className="btn btn-success w-100" href={`/emprestimo/${livro.idlivro}`}>Emprestar</a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}