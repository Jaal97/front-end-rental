import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UseForm } from "../components/UseForm";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Autos = () => {

  const [value, handleInputChange, reset] = UseForm({ ndeserie: '', marca: '', matricula: '', modelo: '' });
  const { ndeserie, marca, matricula, modelo } = value;

  const local_url = 'http://localhost:8080/autos';
  const server_url = 'http://129.213.28.70:8080/autos'
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
      ndeserie: ndeserie,
      marca: marca,
      matricula: matricula,
      modelo: modelo
    }
    if (ndeserie != '' && marca != '' && matricula != '' && modelo != '') {
      fetch(server_url + '/save', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Succes:', response))
      alert('Se guardo el auto con exito')
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
      <h3 className="container">Autos</h3>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="ndeserie" className="form-label">Número de serie</label>
          <input type="text" className="form-control" id="ndeserie" onChange={handleInputChange} name="ndeserie" value={ndeserie} />
        </div>
        <div className="mb-3">
          <label htmlFor="marca" className="form-label">Marca</label>
          <input type="text" className="form-control" id="marca" onChange={handleInputChange} name="marca" value={marca} />
        </div>
        <div className="mb-3">
          <label htmlFor="matricula" className="form-label">Matricula</label>
          <input type="text" className="form-control" id="matricula" onChange={handleInputChange} name="matricula" value={matricula} />
        </div>
        <div className="mb-3">
          <label htmlFor="modelo" className="form-label">Modelo</label>
          <input type="text" className="form-control" id="modelo" onChange={handleInputChange} name="modelo" value={modelo} />
        </div>
        <div className="row">
          <button type="button" className="btn btn-primary col-2 m-2" id="registrar" onClick={save}>Registrar</button>
          {/* <button type="submit" className="btn btn-danger col-2 m-2" id="actualizar" onClick={}>Actualizar</button> */}
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
                      <th>Número de Serie</th>
                      <th>Marca</th>
                      <th>Matricula</th>
                      <th>Modelo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>{objeto.ndeserie}</td>
                    <td>{objeto.marca}</td>
                    <td>{objeto.matricula}</td>
                    <td>{objeto.modelo}</td>
                    <td>
                      <Link to={'/editar_auto/' + objeto.id + '/' + objeto.ndeserie + '/' + objeto.marca + '/' + objeto.matricula + '/' + objeto.modelo}>
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

export default Autos;
