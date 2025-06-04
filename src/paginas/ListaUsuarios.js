import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListaUsuarios(){
    //Declarando uma variavel useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
      let {data} = await axios.get('http://localhost:4000/usuario')
      console.log(data);
      setDados(data);
    };

    useEffect(() => {
      listar();
    }, []);

    return (
        <> 
           <TituloLista titulo = "Usuarios" descricao = "Gerencie aqui os Usuários" rota = "/cadastrousuario" />
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
            <th scope="col">Telefone</th>
          </tr>
        </thead>
        <tbody>
          { dados.map((d, i) => (
            <tr>
            <td>
              <a className="btn btn-primary" href={`/cadastrousuario/${d.idusuario}`}>Alterar</a>
            </td>
            <td>{d.idusuario}</td>
            <td>{d.nome}</td>
            <td>{d.email}</td>
            <td>{d.telefone}</td>
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
