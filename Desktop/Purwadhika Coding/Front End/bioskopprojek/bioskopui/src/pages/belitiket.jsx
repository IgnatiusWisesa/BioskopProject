import React, { Component } from 'react';
import { connect } from 'react-redux'
import Axios from 'axios';
import { url } from '../support/ApiURL';
import numeral from 'numeral'
import { Redirect} from 'react-router-dom'
import { Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap'
import NotFound from './page404'

class Belitiket extends Component {
    state = { 
        datamovie:[],
        seats:260,
        baris:0,
        booked:[],
        loading:true,
        jam:12,
        pilihan:[],
        openmodalcart:false,
        redirecthome:false
     }

     componentDidMount(){
         if(this.props.username!=='admin' && this.props.location.state){
             this.onJamchange()
         }
    }
    
    onJamchange=()=>{
        var studioId = this.props.location.state.studioId
        var movieId = this.props.location.state.id
        console.log(this.props)
        console.log(studioId)
        console.log(movieId)
        console.log(this)
    
        Axios.get(`${url}studios/${studioId}`)
        .then((res1)=>{
            Axios.get(`${url}orders?movieId=${movieId}&jadwal=${this.state.jam}`)
            .then((res2)=>{
                var arrAxios=[]
                res2.data.forEach((val)=>{
                    arrAxios.push(Axios.get(`${url}ordersDetails?orderId=${val.id}`))
                })
                var arrAxios2=[]
                console.log(arrAxios)
                Axios.all(arrAxios)
                .then((res3)=>{
                    console.log(res3)
                    res3.forEach((val)=>{
                        arrAxios2.push(...val.data)
                    })
                    console.log(arrAxios2)
                    this.setState({
                        datamovie:this.props.location.state,
                        seats:res1.data.jumlahKursi,
                        baris:res1.data.jumlahKursi/20,
                        booked:arrAxios2,
                        loading:false
                    })  
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err2)=>{
                console.log(err2)
            })
        }).catch((err1)=>{
            console.log(err1)
        })

     }

     renderseat=()=>{
         console.log(this.state.datamovie)
         console.log(this.state.seats)
         console.log(this.state.baris)
         console.log(this.state.loading)

         var arr=[]

         for(let i=0; i<this.state.baris;i++){
             arr.push([])
             for(let j=0; j<this.state.seats/this.state.baris;j++){
                 arr[i].push(1)
                }
            }

        console.log(this.state.booked)
        for(let j=0; j<this.state.booked.length;j++){
            arr[this.state.booked[j].row][this.state.booked[j].seat]=3
        }

        for(let j=0; j<this.state.pilihan.length;j++){
            arr[this.state.pilihan[j].row][this.state.pilihan[j].seat]=2
        }

        var alfabet= 'ABCDEFGHIJKLMNOPQRSTUUVWXYZ'
        var jsx = arr.map((val,index)=>{
            return(
                <div key={index}>
                    {
                        val.map((val1,i)=>{
                            if(val1===3){
                                return(
                                    <button key={i} disabled className='rounded btn-disble mr-2 mt-2 bg-danger text-center'>
                                        {alfabet[index] +(i+1)} 
                                    </button>
                                )
                            }
                            else if(val1===2){
                                return(
                                    <button key={i} onClick={()=>this.onCancelseatClick(index,i)}   className='rounded btn-order mr-2 mt-2 btn-pilih text-center'>
                                        {alfabet[index] +(i+1)} 
                                    </button>
                                )
                            }
                            return(
                                <button key={i} onClick={()=>this.onPilihSeatClick(index,i)}  className='rounded btn-order mr-2 mt-2 text-center'>
                                    {alfabet[index] +(i+1)} 
                                </button>
                            )
                        })
                    }
                </div>
            )
        })
        return jsx
     }

     onButtonjamclick=(val)=>{
        this.setState({jam:val,pilihan:[]})
        this.onJamchange()   
    }

    onPilihSeatClick=(row,seat)=>{
        var pilihan=this.state.pilihan
        pilihan.push({row:row,seat})//seat:seat bisa juga ditulis begitu 
        this.setState({pilihan:pilihan})
    }

    onOrderClick =()=>{
        var userId = this.props.UserId
        var movieId = this.state.datamovie.id
        var pilihan = this.state.pilihan
        var jadwal = this.state.jam
        var totalharga = this.state.pilihan.length * 25000
        var bayar = false
        var dataorders={
            userId,
            movieId,
            totalharga,
            jadwal,
            bayar
        }
        Axios.post(`${url}orders`,dataorders)
        .then((res)=>{
            console.log(res.data.id)
            var dataorderdetails=[]
            pilihan.forEach((val)=>{
                dataorderdetails.push({
                    orderId: res.data.id,
                    seat: val.seat,
                    row: val.row
                })
            })
            console.log(dataorderdetails)
            var dataorderdetails2 =[]
            dataorderdetails.forEach((val)=>{
                dataorderdetails2.push(Axios.post(`${url}ordersDetails`,val))
            })
            Axios.all(dataorderdetails2)
            .then((res1)=>{
                console.log(res1)
                this.setState({openmodalcart:true})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderHargadanQuantity = () =>{
        var jumlahtiket = this.state.pilihan.length
        var harga = jumlahtiket * 25000
        // this.setState({harga})
        return(
            <div>
                {jumlahtiket} tiket X {'Rp.'+numeral(25000).format('Rp,0.00')} = {'Rp.'+numeral(harga).format('Rp,0,0.00')}
            </div>
        )
    }
    
    onCancelseatClick=(row,seat)=>{
        var pilihan=this.state.pilihan
        var rows=row
        var seats=seat
        var arr=[]
        for (var i=0;i<pilihan.length;i++){
            if(pilihan[i].row!==rows||pilihan[i].seat!==seats){
                arr.push(pilihan[i])
            }
        }
        this.setState({pilihan:arr})
    }

     renderbutton=()=>{
        return this.state.datamovie.jadwal.map((val,index)=>{
            if(this.state.jam===val){
                return(
                    <button className='mx-2 btn btn-outline-primary' disabled>{val}.00</button>
                )
            }
            return(
                <button className='mx-2 btn btn-outline-primary' onClick={()=>this.onButtonjamclick(val)}>{val}.00</button>
            )
        })
    }

    render() {
        if(this.props.location.state && this.props.AuthLog && this.props.username!=='admin'){
            if(this.state.redirecthome){
                return <Redirect to={`/`} /> 
            }

            return ( 
                <div>
                    <Modal isOpen={this.state.openmodalcart}>
                        <ModalBody>
                            Seat successfully booked!
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={()=>this.setState({redirecthome:true})}>Oke</button>
                        </ModalFooter>
                    </Modal>
                    <div>
                        <h2>{this.state.datamovie.title}</h2>
                    </div>
                    <center className='mt-1'>
                        {this.state.loading?null:this.renderbutton()}
                        <div>
                            {this.state.pilihan.length?<button className='btn btn-primary mt-3' onClick={this.onOrderClick}>Order</button> :null}
                        </div>
                        <div>
                        {  this.state.pilihan.length?
                            this.renderHargadanQuantity()
                            :
                            null
                        }
                        </div>
                    </center>
                    <div className="d-flex justify-content-center mt-4">
                        <div>
                            {this.state.loading?null:this.renderseat()} 
                        </div>
                    </div>
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

const MapstateToprops=(state)=>{
    return{
        username:state.Auth.username,
        AuthLog: state.Auth.login,
        UserId: state.Auth.id
    }
}
 
export default connect(MapstateToprops)(Belitiket);