import { UseForm } from "./UseForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditarCliente = () => {

    let params = useParams();
    const local_url = 'http://localhost:8080/clientes';
    const server_url = 'http://129.213.28.70:8080/clientes'

    const [value, handleInputChange, reset] = UseForm({ nombre: params.nombre, apellido: params.apellido, ndocumento: params.ndocumento, direccion: params.direccion });
    const { nombre, apellido, ndocumento, direccion } = value;

    const update = () => {
        fetch(server_url + '/update', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: params.id,
                nombre: nombre,
                apellido: apellido,
                ndocumento: ndocumento,
                direccion: direccion
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
        alert('Se ha Actualizado correctamente')
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
                    <button type="button" className="btn btn-primary col-2 m-2" id="registrar" onClick={update} >Actualizar</button>
                    <Link to={'/clientes'} className="btn btn-warning col-2 m-2">
                        Regresar
                    </Link>
                </div>
            </form>
        </>
    )
} 

export default EditarCliente