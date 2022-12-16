import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UseForm } from "../components/UseForm";
import { useState } from "react";


const Agendas = () => {
    const [value, handleInputChange, reset] = UseForm({ id: '', marca: '', modelo: '', fecha: '' });

    const { id, marca, modelo, fecha } = value;
    

    const local_url = 'http://localhost:8080/agendas';

    const visualizar = () => {
        fetch(local_url + '/all')
            .then((response) => { return response.json(); })
            .then((data) => {
               console.log(data)
                
        });
    }

    const guardar = () => {
       
        let data = {
            id_auto: id,
            marcaauto: marca,
            modelo: modelo,
            fecha: fecha  
        }

        fetch(local_url + '/save',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Succes:', response))
    }

    const actualizar = () => {
        console.log(id);
        console.log(marca);
        console.log(modelo);
        console.log(fecha);
    }

    const eliminarId = () => {
        console.log(id);
        console.log(marca);
        console.log(modelo);
        console.log(fecha);
    }


    return (
        <>
            <h3 className="container">
                Lista de Agendas
            </h3>
            <div className="container">
                <div className="mb-3">
                    <label for="id_auto" className="form-label">ID Auto</label>
                    <input type="text" className="form-control" id="id_auto" onChange={handleInputChange} name='id' value={id} />
                </div>
                <div className="mb-3">
                    <label for="marca" className="form-label">Marca</label>
                    <input type="text" className="form-control" id="marca" onChange={handleInputChange} name='marca' value={marca} />
                </div>
                <div className="mb-3">
                    <label for="modelo" className="form-label">Modelo</label>
                    <input type="text" className="form-control" id="modelo" onChange={handleInputChange} name='modelo' value={modelo} />
                </div>
                <div className="mb-3">
                    <label for="fecha" className="form-label">Fecha</label>
                    <input type="date" className="form-control" id="fecha" onChange={handleInputChange} name='fecha' value={fecha} />
                </div>
                <div className="row">
                    <button type="button " className="btn btn-primary col-2 m-2" id="visualizar" onClick={visualizar}>Visualizar</button>
                    <button type="button" className="btn btn-warning col-2 m-2" id="registrar" onClick={guardar}>Registrar</button>
                    <button type="button" className="btn btn-danger col-2 m-2" id="actualizar" onClick={actualizar}>Actualizar</button>
                </div>
                
            </div>
        </>
    );
}

export default Agendas;