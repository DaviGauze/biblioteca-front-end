import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListaAutor(){
    //Declarando uma variavel useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
      let {data} = await axios.get('http://localhost:4000/autor')
      console.log(data);
      setDados(data);
    };

    useEffect(() => {
      listar();
    }, []);

    return (
        <> 
           <TituloLista titulo = "Autores" descricao = "Gerencie aqui os Autores dos livros da biblioteca" rota = "/cadastroautor" />
           <>
  {/*DADOS*/}
  <div className="row">
    <div className="col">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Foto</th>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Nascimento</th>
          </tr>
        </thead>
        <tbody>
          { dados.map((d, i) => (
            <tr>
            <td>
              <a className="btn btn-primary" href={`/cadastroautor/${d.idautor}`}>Alterar</a>
            </td>
            <td>
              <img classname="img-thumbnail" src={d.foto} style={{width:"80px"}}/>
            </td>
            <td>{d.idautor}</td>
            <td>{d.nomeautor}</td>
            <td>{d.nascimento}</td>
          </tr>
          ) )}
        </tbody>
      </table>
    </div>
  </div>
  {/*FIM DADOS*/}
</>

        </>
    );
};
