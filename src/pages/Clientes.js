import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UseForm } from "../components/UseForm";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const Clientes = () => {

    const [value, handleInputChange, reset] = UseForm({ nombre: '', apellido: '', ndocumento: '', direccion: '' });
    const { nombre, apellido, ndocumento, direccion } = value;

    const local_url = 'http://localhost:8080/clientes';
    const server_url = 'http://129.213.28.70:8080/clientes'
    const [objetos, setObjetos] = useState()

    const get_api = async () => {
        fetch(server_url + '/all')
            .then(response => response.json())
            .then(data => setObjetos(data));
    }

    useEffect(() => {
        get_api()

    }, [])

    const save = () => {
        let capN = nombre[0].toUpperCase() + nombre.substring(1);
        let capA = apellido[0].toUpperCase() + apellido.substring(1);

        let data = {
            nombre: capN,
            apellido: capA,
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
            swal({
                title: "Guardado",
                text: "Se ha guardado con exito el nuevo cliente",
                icon: "success",
                buttons: "OK"
            });
            get_api()
            reset()
        } else {
            swal({
                title: "Error",
                text: "¡No puedes enviar campos vacios!",
                icon: "warning",
                buttons: "OK"
            });
        }
    }

    const confirmDelete = (id) => {
        swal({
            title: "Eliminar elemento",
            text: "Estas seguro de eliminar el elemento seleccionado!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteId(id)
                } else {
                    swal("El elemento seleccionado esta ha salvo!");
                }
            });
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
        get_api()
        swal({
            title: "Eliminado",
            text: "Se ha eliminado el cliente",
            icon: "success",
            buttons: "OK"
        });
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
                    <button type="button" className="btn btn-success col-2 m-2" id="registrar" onClick={save} >Registrar</button>
                    <button type="button" title="Editar" className="btn btn-primary col-2 m-2" id="registrar" onClick={get_api}>Refrescar</button>
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
                                            <button className="btn btn-danger active" onClick={() => {
                                                confirmDelete(objeto.id)
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