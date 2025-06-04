import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Menu from './componentes/Menu';
import FormCategoria from './paginas/FormCategoria';
import Home from './paginas/Home';
import ListaCategoria from './paginas/ListaCategoria';
import ListaAutor from './paginas/ListaAutor';
import FormAutor from './paginas/FormAutor';
import ListaEditora from './paginas/ListaEditora';
import FormEditora from './paginas/FormEditora';
import ListaLivro from './paginas/ListaLivros';
import FormLivros from './paginas/FormLivros';
import ListaUsuarios from './paginas/ListaUsuarios';
import FormUsuarios from './paginas/FormUsuarios';

function App() {
  return (
    <>
    <BrowserRouter>

      <Menu />
      <div className = "container">
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/listacategoria' element = {<ListaCategoria />} />
        <Route path = '/cadastrocategoria/' element = {<FormCategoria />} />
        <Route path = '/cadastrocategoria/:id' element = {<FormCategoria />} />

        <Route path = '/listaautor' element = {<ListaAutor />} />
        <Route path = '/cadastroautor/' element = {<FormAutor />} />
        <Route path = '/cadastroautor/:id' element = {<FormAutor />} />

        <Route path = '/listaeditora' element = {<ListaEditora />} />
        <Route path = '/cadastroeditora/' element = {<FormEditora />} />
        <Route path = '/cadastroeditora/:id' element = {<FormEditora />} />

        <Route path = '/listalivros' element = {<ListaLivro />} />
        <Route path = '/cadastrolivro/' element = {<FormLivros />} />
        <Route path = '/cadastrolivro/:id' element = {<FormLivros />} />

        <Route path = '/listausuarios' element = {<ListaUsuarios />} />
        <Route path = '/cadastrousuario/' element = {<FormUsuarios />} />
        <Route path = '/cadastrousuario/:id' element = {<FormUsuarios />} />

        <Route path = '*' element = {<Home />} />

      </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
