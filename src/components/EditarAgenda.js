import { UseForm } from "./UseForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditarAgenda = () => {
    let params = useParams();
    const local_url = 'http://localhost:8080/agendas';
    const server_url = 'http://129.213.28.70:8080/agendas'

    const [value, handleInputChange, reset] = UseForm({ id_auto: params.id_auto, marca: params.marcaauto, modelo: params.modelo, fecha: params.fecha });
    const { id_auto, marca, modelo, fecha } = value;

   
    const update = () => {
        fetch(server_url + '/update', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                id: params.id,
                id_auto: id_auto,
                marcaauto: marca,
                modelo: modelo,
                fecha: fecha
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
        alert('Se ha Actualizado correctamente')
    }


    return <>
        <form className="container">
            <div className="mb-3">
                <label htmlFor="id_auto" className="form-label">ID Auto</label>
                <input type="text" className="form-control" id="id_auto" onChange={handleInputChange} name='id' value={id_auto} />
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
                    <button type="button" className="btn btn-primary col-2 m-2" id="actualizar" onClick={update} >Actualizar</button>
                    <Link to={'/Agendas'} className="btn btn-warning col-2 m-2" >Regresar
                    </Link>
            </div>
        </form>
    </>
}

export default EditarAgenda