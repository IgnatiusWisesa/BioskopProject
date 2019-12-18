import React, { Component } from 'react';
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import Axios from 'axios';
import { url } from '../support/ApiURL';
import { connect } from 'react-redux'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import NotFound from './page404'

class History extends Component {
    state = { 
        semuadata: [],
        modalDetail: false,
        indexDetail: null
     }

    componentDidMount(){
        // console.log(this.props.UserId)
        Axios.get(`${url}orders?_expand=movie&userId=${this.props.UserId}&bayar=true`)
        .then((res)=>{
            console.log(res.data)
            this.setState({semuadata: res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderSemuaData =()=>{
        console.log(this.state.semuadata)
        if(this.state.semuadata!==0){
            return this.state.semuadata.map((val, index)=>{
                return(
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.tanggal}</TableCell>
                        <TableCell>{val.harga}</TableCell>
                        <TableCell><Button color="success" onClick={()=>this.setState({modalDetail:true, indexDetail: index})}>Detail</Button></TableCell>
                    </TableRow>
                )
            })
        }
    }

    render() {
        if(this.props.username!=='admin'){
            return ( 
                <div>
                    <Modal isOpen={this.state.modalDetail} toggle={()=>this.setState({modalDetail:false})}>
                        <ModalHeader style={{backgroundColor:'#b21f66'}}>Detail</ModalHeader>
                        <ModalBody>
                            <Table>
                                <TableHead>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Judul Film</TableCell>
                                    <TableCell>Jumlah Tiket</TableCell>
                                    <TableCell>Harga</TableCell>
                                </TableHead>
                                <TableBody>
                                {this.state.semuadata!==0 && this.state.indexDetail!==null?(
    
                                        <TableRow>
                                            <TableCell>1</TableCell>
                                            <TableCell>{this.state.semuadata[this.state.indexDetail].movie.title}</TableCell>
                                            <TableCell>{this.state.semuadata[this.state.indexDetail].harga/25000}</TableCell>
                                            <TableCell>{this.state.semuadata[this.state.indexDetail].harga}</TableCell>
                                        </TableRow>
                                ):(null)
                                }
                                </TableBody>
                            </Table>
                        </ModalBody>                        
                    </Modal>
    
    
                    <center>
                    <h4 className="mt-4 mb-4">Transaction History</h4>
                    <Table>
                        <TableHead>
                            <TableCell>No.</TableCell>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Total Harga</TableCell>
                            <TableCell>Details</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderSemuaData()}
                        </TableBody>
                    </Table>
                    </center>
                </div>
             );
        }
        else{
            return ( 
                <NotFound />
             );
        }
    }
}

const MapstateToprops =(state)=>{
    return{
        AuthLog: state.Auth.login,
        Notif: state.Notif,
        UserId:state.Auth.id,
        username:state.Auth.username
    }
}
 
export default connect(MapstateToprops)(History);