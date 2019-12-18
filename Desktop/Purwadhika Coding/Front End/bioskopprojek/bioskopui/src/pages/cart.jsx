import React, { Component } from 'react';
import Axios from 'axios';
import { url } from '../support/ApiURL';
import { Table, TabContent } from 'reactstrap'
import { TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import { connect } from 'react-redux'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { CARTHISTORY } from './../redux/actions'
import { Redirect } from 'react-router-dom'
import NotFound from './page404'

class Cart extends Component {
    state = { 
        datacart: null,
        dataakhir: false,
        modalDetail: false,
        indexDetail: null,
        renderconfDelete: false,
        indexDelete: null,
        siapbayar: false, //belum kepake
        modalCartMasihKosong: false, //belum kepake
        modalBerhasilBayar: false //belum kepake
    }

    componentDidMount(){
        Axios.get(`${url}orders?_expand=movie&userId=${this.props.UserId}&bayar=false`)
        .then((res)=>{
            var datacart = res.data
            // console.log(res.data)
            this.setState({datacart:res.data})
            var qtyarr=[]
            res.data.forEach((element)=>{
                qtyarr.push(Axios.get(`${url}ordersDetails?orderId=${element.id}`))
            })
            var qtyarrfinal=[]
            // console.log(qtyarrfinal)
            Axios.all(qtyarr)
            .then((res1)=>{
                res1.forEach((val)=>{
                    qtyarrfinal.push(val.data)
                })
                // console.log(qtyarrfinal)
                var datafinal = []
                datacart.forEach((val,index)=>{
                    datafinal.push({...val,qty:qtyarrfinal[index]})
                })
                console.log(datafinal)
                this.setState({datacart:datafinal, dataakhir:true})

//===========================================axios post baru start====================================================================================
                let totalharga=0
                for(var i=0; i<this.state.datacart.length;i++){
                    totalharga = totalharga + this.state.datacart[i].totalharga
                }
                // console.log(totalharga)

                var jumlahnotif=0
                if(this.state.datacart !== null && this.state.dataakhir){
                    jumlahnotif = this.state.datacart.length
                }
                else if(this.state.datacart === null && this.state.dataakhir){
                    jumlahnotif=0
                }
                console.log(jumlahnotif)
                localStorage.setItem('notif',jumlahnotif)
//===========================================axios post baru end=======================================================================================
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    CheckOut =()=>{
        // console.log(this.state.datacart)
        if(this.state.datacart !== null){
            var title = []
            for(var i=0;i<this.state.datacart.length;i++){
                title.push(this.state.datacart[i].movie.title)
            }
            console.log(title)

            var qty = []
            for(var i=0;i<this.state.datacart.length;i++){
                qty.push(this.state.datacart[i].qty.length)
            }
            console.log(qty)

            var detail = []
            for(var i=0;i<this.state.datacart.length;i++){
                detail.push(this.state.datacart[i].qty)
            }
            console.log(detail)

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;

            // var tanggal = []
            // for(var i=0;i<this.state.datacart.length;i++){
            //     tanggal.push(today)
            // }
            // console.log(tanggal)

            //     this.setState({datacart: null})
                //     localStorage.clear('notif');

            var totalharga = []
            for(var i=0;i<this.state.datacart.length;i++){
                totalharga.push(this.state.datacart[i].totalharga)
            }
            console.log(totalharga)

            var pesanan=this.state.datacart
            for(var i=0;i<pesanan.length;i++){
                var data={
                    userId:pesanan[i].userId,
                    movieId:pesanan[i].movieId,
                    jadwal:pesanan[i].jadwal,
                    // totalHarga:pesanan[i].totalHarga,
                    tanggal: today,
                    detail: detail[i].qty,
                    harga: pesanan[i].totalharga,
                    bayar:true,
                    id:pesanan[i].id
                }
                var id=data.id
                // console.log(data)
                Axios.put(`${url}orders/${id}`,data)
                .then(res=>{
                    localStorage.clear('notif')
                    this.componentDidMount()
                }).catch(err=>{
                    console.log(err)
                })
            }
            this.setState({modalcheckout:false})

        }
        else if(this.state.datacart === null){
            this.setState({modalCartMasihKosong:true})
        }
    }

    renderCart =()=>{
        // console.log(this.state.datacart)
        if(this.state.datacart!==null && this.state.dataakhir){
            if(this.state.datacart.length===0 || this.state.dataakhir===false){
                return (
                    <TableRow>
                        <TableCell>
                            No Items in Cart
                        </TableCell>
                    </TableRow>
                    )
            }
            return this.state.datacart.map((val,index)=>{
                return(
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.movie.title}</TableCell>
                        <TableCell>{val.jadwal}</TableCell>
                        <TableCell>{val.qty.length}</TableCell>
                        <TableCell>{val.totalharga}</TableCell>
                        <TableCell><Button color="success" onClick={()=>this.setState({modalDetail:true, indexDetail: index})}>Detail</Button></TableCell>
                        <TableCell><Button color="warning" onClick={()=>this.setState({renderconfDelete: true, indexDelete: (val.id)})}>Cancel</Button></TableCell>
                    </TableRow>
                )
            })
        }
        else{
            return(
                <TableRow></TableRow>
            )
        }
    }
    
    totalHarga=()=>{
        if(this.state.datacart!==null && this.state.dataakhir){
            // console.log(this.state.datacart)
            let totalharga=0
            for(var i=0; i<this.state.datacart.length;i++){
                totalharga = totalharga + this.state.datacart[i].totalharga
            }
            return(
                <TableCell>{totalharga}</TableCell>
            )
        }
        else{
            return(
                <TableCell></TableCell>
            )
        }
    }

    deleteOrder =()=>{
        var index = (this.state.indexDelete)
        console.log(index)

        Axios.delete(`${url}orders/${index}`)
            .then((res)=>{
                console.log(res.data)
                Axios.get(`${url}orders`)
                .then((res)=>{
                    this.setState({
                        datacart:res.data,
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

    render() {
        if(this.props.UserId && this.props.username!=='admin'){
            return (
                <div>
                    <Modal isOpen={this.state.modalDetail} toggle={()=>this.setState({modalDetail:false})}>
                        <ModalHeader style={{backgroundColor:'#b21f66'}}>Detail</ModalHeader>
                        <ModalBody>
                            <Table>
                                <TableHead>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Bangku</TableCell>
                                </TableHead>
                                <TableBody>
                                {this.state.datacart!==0 && this.state.dataakhir && this.state.indexDetail!==null?(
                                  this.state.datacart[this.state.indexDetail].qty.map((val, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{"abcdefghijklmnopqrstuvwxyz".toUpperCase()[val.row] + [val.seat + 1]}</td>
                                    </tr>
                                  );
                                })
                                ):(null)
                                }
                                </TableBody>
                            </Table>
                        </ModalBody>                        
                    </Modal>

                    <Modal isOpen={this.state.renderconfDelete} toggle={()=>this.setState({renderconfDelete:false})}>
                        <ModalBody>
                        Are you sure want to cancel this order?
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={()=>this.deleteOrder()}>Yes</Button>
                        <Button color="secondary" onClick={()=>this.setState({renderconfDelete: false})}>No</Button>
                        </ModalFooter>
                    </Modal>


                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Jadwal</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Harga</TableCell>
                                <TableCell>Details</TableCell>
                                <TableCell>Cancel Order</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderCart()}
                            <TableRow>
                                <TableCell>Total Harga</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                {this.totalHarga()}
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow></TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button color="success" onClick={()=>{this.CheckOut()}}>
                                        Check Out & Pay
                                    </Button>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
             );
        }
        return (
            <NotFound />
        )

    }
}

const MapstateToprops =(state)=>{
    return{
        AuthLog: state.Auth.login,
        UserId:state.Auth.id,
        username:state.Auth.username
    }
}
 
export default connect(MapstateToprops, {CARTHISTORY})(Cart);
