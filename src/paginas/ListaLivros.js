import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListaLivro(){
    const [dados, setDados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [editoras, setEditoras] = useState([]);

    const listar = async () => {
      let {data} = await axios.get('http://localhost:4000/livro');
      setDados(data);
    };

    const listarCategorias = async () => {
      let {data} = await axios.get('http://localhost:4000/categoria');
      setCategorias(data);
    };

    const listarEditoras = async () => {
      let {data} = await axios.get('http://localhost:4000/editora');
      setEditoras(data);
    };

    useEffect(() => {
      listar();
      listarCategorias();
      listarEditoras();
    }, []);

    const getNomeCategoria = (idcategoria) => {
      const cat = categorias.find(c => String(c.idcategoria) === String(idcategoria));
      return cat ? cat.nomecategoria : idcategoria;
    };

    const getNomeEditora = (ideditora) => {
      const edit = editoras.find(e => String(e.ideditora) === String(ideditora));
      return edit ? edit.nomeeditora : ideditora;
    };

    return (
        <> 
           <TituloLista titulo = "Livros" descricao = "Gerencie aqui os livros da biblioteca" rota = "/cadastrolivro" />
           <>
  <div className="row">
    <div className="col">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Titulo</th>
            <th scope="col">Publicação</th>
            <th scope="col">Categoria</th>
            <th scope="col">Editora</th>
            <th scope="col">Edição</th>
          </tr>
        </thead>
        <tbody>
          { dados.map((d, i) => (
            <tr key={d.idlivro}>
            <td>
              <a className="btn btn-primary" href={`/cadastrolivro/${d.idlivro}`}>Alterar</a>
            </td>
            <td>{d.idlivro}</td>
            <td>{d.titulo}</td>
            <td>{d.publicacao}</td>
            <td>{getNomeCategoria(d.idcategoria)}</td>
            <td>{getNomeEditora(d.ideditora)}</td>
            <td>{d.edicao}</td>
          </tr>
          ) )}
        </tbody>
      </table>
    </div>
  </div>
</>
        </>
    );
};
