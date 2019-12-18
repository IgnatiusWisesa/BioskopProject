import React, { Component } from 'react';
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import Axios from 'axios';
import { url } from '../support/ApiURL';
// import { connect } from 'react-redux'

class History extends Component {
    state = { 
        semuadata: []
     }

    componentDidMount(){
        Axios.get(`${url}transactions`)
        .then((res)=>{
            console.log(res.data)
            this.setState({semuadata: res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderSemuaData =()=>{
        console.log(this.state.semuadata[0])

        return this.state.semuadata.map((val, index)=>{
            return(
                <TableRow key={index}>
                    <TableCell></TableCell>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{index+1}</TableCell>
                </TableRow>
            )
        })
    }

    render() { 
        return ( 
            <div>
                <center>
                <h4 className="mt-4 mb-4">Transaction History</h4>
                <Table>
                    <TableHead>
                        <TableCell>No.</TableCell>
                        <TableCell>Nama Film</TableCell>
                        <TableCell>Tanggal</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Details</TableCell>
                    </TableHead>
                    <TableBody>
                        {this.renderSemuaData()}
                    </TableBody>
                    {/* <Table.Body>{this.renderHistory()}</Table.Body> */}
                </Table>
                </center>
            </div>
         );
    }
}

// const MapstateToprops =(state)=>{
//     return{
//         AuthLog: state.Auth.login,
//         Notif: state.Notif
//     }
// }
 
export default History;