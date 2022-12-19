import React from "react";
import { Link } from "react-router-dom";


const MenuNavbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <Link to='/'>
                       <img src="./sports.png" width='100px'>
                       </img>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item ">
                                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/agendas'>Agendas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/autos'>Autos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to='/clientes'>Clientes</Link>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </nav>
        </>
    );
}


export default MenuNavbar;