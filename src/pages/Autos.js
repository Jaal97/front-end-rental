import React, { Component } from "react";
import { UseForm } from "../components/UseForm";
// import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


//const Autos =() =>{

//     render() return(
//         <>
//             <h3 className="container">Autos</h3>
//             <div className="container">
//                 <div className="mb-3">
//                     <label for="nserie" className="form-label">Número de serie</label>
//                     <input type="text" className="form-control" id="nserie" />
//                 </div>
//                 <div className="mb-3">
//                     <label for="marca" className="form-label">Marca</label>
//                     <input type="text" className="form-control" id="matricula" />
//                 </div>
//                 <div className="mb-3">
//                     <label for="matricula" className="form-label">Matricula</label>
//                     <input type="text" className="form-control" id="matricula" />
//                 </div>
//                 <div className="mb-3">
//                     <label for="modelo" className="form-label">Modelo</label>
//                     <input type="text" className="form-control" id="modelo" />
//                 </div>
//                 <div className="row">
//                     <button type="submit " className="btn btn-primary col-2 m-2" id="visualizar">Visualizar</button>
//                     <button type="submit" className="btn btn-warning col-2 m-2" id="registrar">Registrar</button>
//                     <button type="submit" className="btn btn-danger col-2 m-2" id="actualizar">Actualizar</button>
//                 </div>
//             </div>
//         </>
//     );

// }

// export default Autos;
const url="https://localhost:8080/autos";
class App extends Component {
    
    state={
      data:[],
      modalInsertar: false,
      modalEliminar: false,
      form:{
        ndeserie: '',
        marca: '',
        matricula: '',
        modelo: ''
      }
    }
    
    peticionGet=()=>{
      fetch(url + '/all')
               .then((response) => { return response.json(); })
               .then((data) => {
                this.setState({data: data});
                  //  console.log(objetos)
      });

    // axios.get(url+'/all').then(response=>{
    //   this.setState({data: response.data});
    // }).catch(error=>{
    //   console.log(error.message);
      
    // })
    }
    
    peticionPost=async()=>{
      delete this.state.form.id;
     await axios.post(url+'/save',this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      }).catch(error=>{
        console.log(error.message);
      })
    }
    
    peticionPut=()=>{
      axios.put(url+'/update/'+this.state.form.id, this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      })
    }
    
    peticionDelete=()=>{
      axios.delete(url+'/'+this.state.form.id).then(response=>{
        this.setState({modalEliminar: false});
        this.peticionGet();
      })
    }
    
    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar});
    }
    
    seleccionarAuto=(auto)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          ndeserie: auto.ndeserie,
          marca: auto.marca,
          matricula: auto.matricula,
          modelo: auto.modelo
        }
      })
    }
    
    handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }
    
      componentDidMount() {
        this.peticionGet();
      }
      
    
      render(){
        const {form}=this.state;
      return (
        <div className="App">
        <br /><br /><br />
      <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar</button>
      <br /><br />
        <table className="table ">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Numero de Serie</th>
              <th>Marca</th>
              <th>Matricula</th>
              <th>Modelo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(auto=>{
              return(
                <tr>
              {/* <td>{auto.id}</td> */}
              <td>{auto.ndeserie}</td>
              <td>{auto.marca}</td>
              <td>{auto.modelo}</td>
              <td>
                    <button className="btn btn-primary" onClick={()=>{this.seleccionarAuto(auto); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAuto(auto); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                    </td>
              </tr>
              )
            })}
          </tbody>
        </table>
    

        <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                      <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                      <div className="form-group">
                        {/* <label htmlFor="id">ID</label>
                        <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/> */}
                        <br />
                        <label htmlFor="ndeserie">Número de Serie</label>
                        <input className="form-control" type="text" name="ndeserie" id="ndeserie" onChange={this.handleChange} value={form?form.ndeserie: ''}/>
                        <br />
                        <label htmlFor="marca">Marca</label>
                        <input className="form-control" type="text" name="marca" id="marca" onChange={this.handleChange} value={form?form.marca: ''}/>
                        <br />
                        <label htmlFor="matricula">Matricula</label>
                        <input className="form-control" type="text" name="matricula" id="matricula" onChange={this.handleChange} value={form?form.matricula:''}/>
                        <br />
                        <label htmlFor="modelo">Modelo</label>
                        <input className="form-control" type="text" name="modelo" id="modelo" onChange={this.handleChange} value={form?form.modelo:''}/>
                      </div>
                    </ModalBody>
    
                    <ModalFooter>
                      {this.state.tipoModal=='insertar'?
                        <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                        Insertar
                      </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                        Actualizar
                      </button>
      }
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
              </Modal>
    
    
              <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                   Estás seguro que deseas eliminar a la empresa {form && form.nombre}
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                </ModalFooter>
              </Modal>
      </div>
    
    
    
      );
    }
    }
    export default App;