import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuNavbar from './components/MenuNavbar';
import Home from './pages/Home';
import Agendas from './pages/Agendas';
import Autos from './pages/Autos';
import Clientes from './pages/Clientes';
import EditarAgenda from './components/EditarAgenda'
import EditarAuto from './components/EditarAuto'
import EditarCliente from './components/EditarCliente'


const App = () =>{
    return(
        <div className='App'>
            <Router>
                <MenuNavbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/agendas' element={<Agendas/>}/>
                    <Route path='/autos' element={<Autos/>}/>
                    <Route path='/clientes' element={<Clientes/>}/>
                    <Route path='/editar_agenda/:id/:id_auto/:marcaauto/:modelo/:fecha' element={<EditarAgenda/>}/>
                    <Route path='/editar_auto/:id/:ndeserie/:marca/:matricula/:modelo' element={<EditarAuto/>}/>
                    <Route path='/editar_cliente/:id/:nombre/:apellido/:ndocumento/:direccion' element={<EditarCliente/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;