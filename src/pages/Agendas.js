import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UseForm } from "../components/UseForm";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Agendas = () => {
    const [value, handleInputChange, reset] = UseForm({ id_auto: '', marca: '', modelo: '', fecha: '' });
    const { id_auto, marca, modelo, fecha } = value;
    
    const local_url = 'http://localhost:8080/agendas';
    const server_url = 'http://129.213.28.70:8080/agendas'
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
            id_auto: id_auto,
            marcaauto: marca,
            modelo: modelo,
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
            alert('Se guardo la Agenda con exito')
            get_api()
            reset()
        } else {
            alert('No puedes enviar campos vacios');
        }
    }
    
    const load_data = (id_auto) => {
        console.log(id_auto)
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
            <h3 className="container">
                Lista de Agendas
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
                    <button type="button" title="Editar" className="btn btn-warning col-2 m-2" id="registrar" onClick={save}>Registrar</button>
                    {/* <button type="button" className="btn btn-primary col-2 m-2" id="actualizar" >Actualizar</button> */}
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
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>{objeto.marcaauto}</td>
                                        <td>{objeto.modelo}</td>
                                        <td>{objeto.fecha}</td>
                                        <td>
                                            <Link to={'/editar_agenda/'+ objeto.id+'/'+objeto.id_auto+'/'+objeto.marcaauto+'/'+objeto.modelo+'/'+objeto.fecha}>
                                            <button className="btn btn-primary" onClick={() => {
                                                load_data(objeto.id_auto)
                                            }}>
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

export default Agendas;