import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UseForm } from "../components/UseForm";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import swal from 'sweetalert';


const Autos = () => {

  const [value, handleInputChange, reset] = UseForm({ ndeserie: '', marca: '', matricula: '', modelo: '' });
  const { ndeserie, marca, matricula, modelo } = value;

  const local_url = 'http://localhost:8080/autos';
  const server_url = 'http://129.213.28.70:8080/autos'
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
    let mayuMa = matricula.toUpperCase();
    let capMo = modelo[0].toUpperCase() + modelo.substring(1);

    let data = {
      ndeserie: ndeserie,
      marca: capMa,
      matricula: mayuMa,
      modelo: capMo
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
      swal({
        title: "Guardado",
        text: "Se ha guardado con exito el nuevo auto",
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
    swal({
      title: "Eliminado",
      text: "Se ha eliminado el auto",
      icon: "success",
      buttons: "OK"
    });
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
          <button type="button" className="btn btn-success col-2 m-2" id="registrar" onClick={save}>Registrar</button>
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

export default Autos;
