import { UseForm } from "./UseForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const EditarAuto = () => {

  let params = useParams();
  const local_url = 'http://localhost:8080/autos';
  const server_url = 'http://129.213.28.70:8080/autos'

  const [value, handleInputChange, reset] = UseForm({ ndeserie: params.ndeserie, marca: params.marca, matricula: params.matricula, modelo: params.modelo });
  const { ndeserie, marca, matricula, modelo } = value;

  const update = () => {
    let capMa = marca[0].toUpperCase() + marca.substring(1);
    let mayuMa = matricula.toUpperCase();
    let capMo = modelo[0].toUpperCase() + modelo.substring(1);

    fetch(server_url + '/update', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.id,
        ndeserie: ndeserie,
        marca: capMa,
        matricula: mayuMa,
        modelo: capMo
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
    swal({
      title: "Actualizado",
      text: "Has actualizado correctamente el auto!",
      icon: "success",
      button: "OK"

    })
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
          <button type="button" className="btn btn-primary col-2 m-2" id="registrar" onClick={update}>Actualizar</button>
          <Link to={'/Autos'} className="btn btn-info col-2 m-2">
            Regresar
          </Link>
        </div>
      </form>
    </>
  )
}

export default EditarAuto