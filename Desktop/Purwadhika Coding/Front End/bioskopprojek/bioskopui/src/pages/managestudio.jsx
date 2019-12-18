import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core'
import Axios from 'axios';
import { url } from '../support/ApiURL';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import NotFound from './page404'

class ManageStudio extends Component {
    state = {
        namauser: [],
        datastudio:[],
        addModal:false,
        renderconfDelete:false,
        indexDelete: null,
        editModal:false
     }

     componentDidMount(){
        //  console.log(this.props.Auth.login)
         Axios.get(`${url}users/${this.props.Auth.id}`)
         .then((res)=>{
            //  console.log(res.data.username)
             this.setState({namauser: res.data.username})
         }).catch((err)=>{
             console.log(err)
         })

         Axios.get(`${url}studios`)
         .then((res)=>{
             console.log(res.data)
            this.setState({datastudio: res.data})
         }).catch((err)=>{
             console.log(err)
         })
     }

     renderStudio =()=>{
         return this.state.datastudio.map((val,index)=>{
             return(
                 <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.nama}</TableCell>
                    <TableCell>{val.jumlahKursi}</TableCell>
                    <Button className='mr-3' outline color="primary" onClick={()=>this.setState({editModal:true, indexEdit: (val.id)})}>Edit</Button>
                    <Button outline color="danger" onClick={()=>this.setState({renderconfDelete: true, indexDelete: (val.id)})}>Delete</Button>
                 </TableRow>
             )
         })
     }

     saveStudioBaru=()=>{
        var nama = this.refs.nama.value
        var seat = this.refs.seat.value
        console.log(nama)
        console.log(seat)

        var studiobaru = {
            nama: nama,
            jumlahKursi: seat
        }

        Axios.post(`${url}studios`,studiobaru)
        .then(()=>{
            Axios.get(`${url}studios`)
            .then((res)=>{
                this.setState({
                    datastudio: res.data,
                    addModal: false
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
     }

     deleteStudio =()=>{
        var index = (this.state.indexDelete)
        console.log(index)

        Axios.delete(`${url}studios/${index}`)
            .then((res)=>{
                console.log(res.data)
                Axios.get(`${url}studios`)
                .then((res)=>{
                    this.setState({
                        datastudio:res.data,
                        renderconfDelete: false
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            }) 
     }

     editStudio = ()=>{
        var index = this.state.indexEdit
        console.log(index)

        var nama = this.refs.namaedit.value
        var seat = this.refs.seatedit.value
        console.log(nama)
        console.log(seat)

        var studioedit = {
            nama: nama,
            jumlahKursi: seat
        }

        Axios.put(`${url}studios/${index}`,studioedit)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${url}studios`)
            this.setState({
                datastudio:res.data,
                editModal:false
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
     }

    render() {
        if(this.props.Auth.login && this.state.namauser==='admin'){
            return(
                <div>
{/* ===============================================Modal Add Start==================================================================== */}
                    <Modal isOpen={this.state.addModal} toggle={()=>this.setState({addModal:false})}>
                        <ModalHeader style={{backgroundColor:'#b21f66'}}>Add Studio</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='nama'  placeholder="Nama Studio" className='form-control mt-2'/>
                            <input type="number" ref='seat' placeholder="Jumlah Kursi" className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>this.saveStudioBaru()}>Add to Studios</Button>
                            <Button color="secondary" onClick={()=>this.setState({addModal:false})}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
{/* ===============================================Modal Add End==================================================================== */}
{/* ===============================================Modal Konfirmasi Delete Start==================================================================== */}
                        <Modal isOpen={this.state.renderconfDelete} toggle={()=>this.setState({renderconfDelete:false})}>
                            <ModalBody>
                            Are you sure want to delete the studio?
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={()=>this.deleteStudio()}>Delete</Button>
                            <Button color="secondary" onClick={()=>this.setState({renderconfDelete: false})}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
{/* ===============================================Modal Konfirmasi Delete End==================================================================== */}
{/* ===============================================Modal Edit Start==================================================================== */}
                        <Modal isOpen={this.state.editModal} toggle={()=>this.setState({editModal:false})}>
                            <ModalHeader style={{backgroundColor:'#b21f66'}}>
                                Edit Studio
                            </ModalHeader>
                        <ModalBody>
                            <input type="text" ref='namaedit'  placeholder="Nama Studio" className='form-control mt-2'/>
                            <input type="number" ref='seatedit' placeholder="Jumlah Kursi" className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>this.editStudio()}>Edit Studio</Button>
                            <Button color="secondary" onClick={()=>this.setState({editModal:false})}>Cancel</Button>
                        </ModalFooter>
                        </Modal>
{/* ===============================================Modal Edit End==================================================================== */}
                    <Table>
                        <TableHead>
                            <TableCell>No.</TableCell>
                            <TableCell>Nama Studio</TableCell>
                            <TableCell>Jumlah Seat</TableCell>
                            <TableCell>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderStudio()}
                        </TableBody>
                    </Table>
                    <br></br>
                    <center><Button outline color="success" onClick={()=>this.setState({addModal:true})}>Add Studio</Button></center>
                <br></br>
                </div>
            )
        }
        else{
            return(
                <NotFound />
            )
        }
    }
}

const MapstateToprops = state => {
    return {
      Auth: state.Auth
    };
  };
 
export default connect(MapstateToprops)(ManageStudio);