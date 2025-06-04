import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListaFuncionarios(){
    //Declarando uma variavel useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
      let {data} = await axios.get('http://localhost:4000/funcionario')
      console.log(data);
      setDados(data);
    };

    useEffect(() => {
      listar();
    }, []);

    return (
        <> 
           <TituloLista titulo = "Funcionários" descricao = "Gerencie aqui os Funcionários" rota = "/cadastrofuncionario" />
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
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          { dados.map((d, i) => (
            <tr>
            <td>
              <a className="btn btn-primary" href={`/cadastrofuncionario/${d.idfuncionario}`}>Alterar</a>
            </td>
            <td>{d.idfuncionario}</td>
            <td>{d.nomefuncionario}</td>
            <td>{d.email}</td>
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