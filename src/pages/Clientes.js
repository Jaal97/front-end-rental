import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UseForm } from "../components/UseForm";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Clientes = () => {

    const [value, handleInputChange, reset] = UseForm({ nombre: '', apellido: '', ndocumento: '', direccion: '' });
    const { nombre, apellido, ndocumento, direccion } = value;

    const local_url = 'http://localhost:8080/clientes';
    const server_url = 'http://129.213.28.70:8080/clientes'
    const [objetos, setObjetos] = useState()

    const get_api = async () => {
        const response = await fetch(server_url + '/all')
        // console.log(response.status)
        const responseJSON = await response.json()
        setObjetos(responseJSON)
    }

    useEffect(() => {
        get_api()

    }, [])

    const save = () => {
        let data = {
            nombre: nombre,
            apellido: apellido,
            ndocumento: ndocumento,
            direccion: direccion
        }
        if (nombre != '' && apellido != '' && ndocumento != '' && direccion != '') {
            fetch(server_url + '/save', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Succes:', response))
            alert('Se guardo el cliente con exito')
            get_api()
            reset()
        } else {
            alert('No puedes enviar campos vacios');
        }
    }


    const deleteId = (id) => {
        JSON.stringify(id)
        fetch(server_url + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Succes:', response))
        alert('Se ha eliminado correctamente la agenda')
        get_api()
    }

    return (
        <>
            <h3 className="container">Clientes</h3>
            <form className="container">
                <div class="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" onChange={handleInputChange} name="nombre" value={nombre} />
                </div>
                <div className="mb-3">
                    <label htmlfor="apellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="apellido" onChange={handleInputChange} name="apellido" value={apellido} />
                </div>
                <div className="mb-3">
                    <label htmlfor="ndocumento" className="form-label">Número de Documento</label>
                    <input type="text" className="form-control" id="ndocumento" onChange={handleInputChange} name="ndocumento" value={ndocumento} />
                </div>
                <div className="mb-3">
                    <label htmlfor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" onChange={handleInputChange} name="direccion" value={direccion} />
                </div>
                <div className="row">
                    <button type="button" className="btn btn-primary col-2 m-2" id="registrar" onClick={save} >Registrar</button>
                </div>
            </form>
            <div>
                <ul>
                    {!objetos ? 'Cargando...' :
                        objetos.map((objeto, index) => {
                            return <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Número de Documento</th>
                                            <th>Dirección</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>{objeto.nombre}</td>
                                        <td>{objeto.apellido}</td>
                                        <td>{objeto.ndocumento}</td>
                                        <td>{objeto.direccion}</td>
                                        <td>
                                            <Link to={'/editar_cliente/' + objeto.id + '/' + objeto.nombre + '/' + objeto.apellido + '/' + objeto.ndocumento + '/' + objeto.direccion}>
                                                <button className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => {
                                                deleteId(objeto.id)
                                            }}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </td>
                                    </tbody>
                                </table>
                            </>
                        })
                    }
                </ul>
            </div>
        </>
    );
}

export default Clientes;