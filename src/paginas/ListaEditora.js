import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListaEditora(){
    //Declarando uma variavel useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
      let {data} = await axios.get('http://localhost:4000/editora')
      console.log(data);
      setDados(data);
    };

    useEffect(() => {
      listar();
    }, []);

    return (
        <> 
           <TituloLista titulo = "Editoras" descricao = "Gerencie aqui as Editoras dos livros da biblioteca" rota = "/cadastroeditora" />
           <>
  {/*DADOS*/}
  <div className="row">
    <div className="col">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Endereço</th>
            <th scope="col">CNPJ</th>
          </tr>
        </thead>
        <tbody>
          { dados.map((d, i) => (
            <tr>
            <td>
              <a className="btn btn-primary" href={`/cadastroeditora/${d.ideditora}`}>Alterar</a>
            </td>
            <td>{d.ideditora}</td>
            <td>{d.nomeeditora}</td>
            <td>{d.endereco}</td>
            <td>{d.cnpj}</td>
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
