import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuNavbar from './components/MenuNavbar';
import Home from './pages/Home';
import Agendas from './pages/Agendas';
import Autos from './pages/Autos';
import Clientes from './pages/Clientes';
import EditarAgenda from './components/EditarAgenda'


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
                </Routes>
            </Router>
        </div>
    );
}

export default App;