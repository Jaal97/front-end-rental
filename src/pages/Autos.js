import React from "react";
import { UseForm } from "../components/UseForm";

const Autos = () =>{
    return(
        <>
            <h3 className="container">Autos</h3>
            <div className="container">
                <div className="mb-3">
                    <label for="nserie" className="form-label">Número de serie</label>
                    <input type="text" className="form-control" id="nserie" />
                </div>
                <div className="mb-3">
                    <label for="marca" className="form-label">Marca</label>
                    <input type="text" className="form-control" id="matricula" />
                </div>
                <div className="mb-3">
                    <label for="matricula" className="form-label">Matricula</label>
                    <input type="text" className="form-control" id="matricula" />
                </div>
                <div className="mb-3">
                    <label for="modelo" className="form-label">Modelo</label>
                    <input type="text" className="form-control" id="modelo" />
                </div>
                <div className="row">
                    <button type="submit " className="btn btn-primary col-2 m-2" id="visualizar">Visualizar</button>
                    <button type="submit" className="btn btn-warning col-2 m-2" id="registrar">Registrar</button>
                    <button type="submit" className="btn btn-danger col-2 m-2" id="actualizar">Actualizar</button>
                </div>
            </div>
        </>
    );

}

export default Autos;