import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UseForm } from "../components/UseForm";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './main.css'
import swal from 'sweetalert';


const Agendas = () => {
    const [value, handleInputChange, reset] = UseForm({ id_auto: '', marca: '', modelo: '', fecha: '' });
    const { id_auto, marca, modelo, fecha } = value;

    const local_url = 'http://localhost:8080/agendas';
    const server_url = 'http://129.213.28.70:8080/agendas'
    const [objetos, setObjetos] = useState()

    const get_api = () => {
        fetch(server_url + '/all')
        .then(response => response.json())
        .then(data => setObjetos(data));
    }

    useEffect(() => {
        get_api()

    }, [])

    const save = () => {
        let capMa = marca[0].toUpperCase() + marca.substring(1);
        let capMo = modelo[0].toUpperCase() + modelo.substring(1);

        let data = {
            id_auto: id_auto,
            marcaauto: capMa,
            modelo: capMo,
            fecha: fecha
        }
        if (id_auto != '' && marca != '' && modelo != '' && fecha != '') {
            fetch(server_url + '/save', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Succes:', response))
            get_api()
            swal({
                title: "Guardado",
                text: "Se ha guardado con exito la agenda",
                icon: "success",
                buttons: "OK"
            });
            
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

    const load_data = (id_auto) => {
        console.log(id_auto)
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
        get_api();
        swal({
            title: "Eliminado",
            text: "Se ha eliminado la agenda",
            icon: "success",
            buttons: "OK"
        });
    }

    return (
        <>
            <h3 className="container">
                Agendas
            </h3>
            <form className="container">
                <div className="mb-3">
                    <label htmlFor="id_auto" className="form-label">ID Auto</label>
                    <input type="text" className="form-control" id="id_auto" onChange={handleInputChange} name='id_auto' value={id_auto} />
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <input type="text" className="form-control" id="marca" onChange={handleInputChange} name='marca' value={marca} />
                </div>
                <div className="mb-3">
                    <label htmlFor="modelo" className="form-label">Modelo</label>
                    <input type="text" className="form-control" id="modelo" onChange={handleInputChange} name='modelo' value={modelo} />
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input type="date" className="form-control" id="fecha" onChange={handleInputChange} name='fecha' value={fecha} />
                </div>
                <div className="row">
                    <button type="button" title="Editar" className="btn btn-success col-2 m-2" id="registrar" onClick={save}>Registrar</button>
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
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>{objeto.marcaauto}</td>
                                        <td>{objeto.modelo}</td>
                                        <td>{objeto.fecha}</td>
                                        <td>
                                            <Link to={'/editar_agenda/' + objeto.id + '/' + objeto.id_auto + '/' + objeto.marcaauto + '/' + objeto.modelo + '/' + objeto.fecha}>
                                                <button className="btn btn-primary" onClick={() => {
                                                    load_data(objeto.id_auto)
                                                }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </Link>
                                            <button className="btn btn-danger active btn-eraser" onClick={() => {
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

export default Agendas;