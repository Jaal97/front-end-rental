import React from "react";

const Clientes = () =>{
    return(
        <>
            <h3 className="container">Clientes</h3>
            <div className="container">
                <div class="mb-3">
                    <label for="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" />
                </div>
                <div className="mb-3">
                    <label for="apellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="apellido"/>
                </div>
                <div className="mb-3">
                    <label for="numero_documento" className="form-label">Número de Documento</label>
                    <input type="text" className="form-control" id="numero_documento"/>
                </div>
                <div className="mb-3">
                    <label for="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" />
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

export default Clientes;