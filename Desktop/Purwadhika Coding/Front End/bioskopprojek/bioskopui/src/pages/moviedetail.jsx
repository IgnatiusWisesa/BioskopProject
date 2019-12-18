import React, { Component } from 'react';
import { Badge,Jumbotron,Container,Spinner,Button, Card,CardBody,CardHeader,CardTitle,CardText,CardFooter, Modal,ModalBody,ModalHeader,ModalFooter, CardSubtitle, CardImg  } from 'reactstrap';
import Axios from 'axios';
import { url } from '../support/ApiURL';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class MovieDetail extends Component {
    state = { 
        datadetailfilm:{},
        statusLogin:false,
        modalBelumLogin: false,
        toLoginPage:false,
        rediBuy: false
     }

     componentDidMount(){
         Axios.get(`${url}movies/${this.props.match.params.id}`)
         .then((res)=>{
            //  console.log(res.data)
             this.setState({
                 datadetailfilm:res.data
                })
                // this.toBeliTiket()
         }).catch((err)=>{
             console.log(err)
         })
     }

    buyTicket =() =>{
        {this.setState({rediBuy:true})}
        if(this.props.AuthLog){
            this.setState({statusLogin: true})
        }
        else{
            this.setState({modalBelumLogin:true})
        }

        // console.log(this.state.statusLogin)
    }

    render() { 
        // console.log(this.state.datadetailfilm)
        if(this.state.toLoginPage===true){
            return <Redirect to={'/login'} />
        }
        if(this.props.AuthLog && this.state.rediBuy){
            console.log(this.state.datadetailfilm)
            return <Redirect to={{pathname:'/belitiket', state:this.state.datadetailfilm}} />
        }

        return ( 
            <div>
                <div>
                    <Card>
                        <CardImg top className="mx-auto" style={{width:'300px'}} src={this.state.datadetailfilm.image} alt="Card image cap" />
                        <CardBody>
                        <CardTitle><h3>{this.state.datadetailfilm.title}</h3></CardTitle>
                        <CardSubtitle><h2>{this.state.datadetailfilm.produksi}</h2></CardSubtitle>
                        <br></br>
                        <Button outline color="warning" onClick={()=>{this.buyTicket()}}>Order Me A Seat Now!</Button>
                        </CardBody>
                    </Card>
{/* ================================================================Modal Belum Login Start======================================================================== */}
                        <Modal isOpen={this.state.modalBelumLogin} toggle={()=>this.setState({modalBelumLogin:false})}>
                            <ModalHeader style={{backgroundColor:'#b21f66'}}>
                                Notification!
                            </ModalHeader>
                            <ModalBody>
                                <center>
                                You Have Not Yet Login, Go to Login Page..

                                </center>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={()=>this.setState({toLoginPage:true})}>Oke!</Button>
                            <Button color="secondary" onClick={()=>this.setState({modalBelumLogin: false})}>No thanks</Button>
                            </ModalFooter>
                        </Modal>
{/* ================================================================Modal Belum Login End======================================================================== */}
                </div>
            </div>
         );
    }
}

const MapstateToprops =(state) =>{
    return{
        AuthLog: state.Auth.login
    }
}
 
export default connect(MapstateToprops)(MovieDetail);