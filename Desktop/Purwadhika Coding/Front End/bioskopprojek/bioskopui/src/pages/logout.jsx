import React, { Component } from 'react';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { Link,Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginSuccessAction, Loginthunk,Login_error } from './../redux/actions'

class Logout extends Component {
    state = {
        modalkonfirmasiLogout: true,
        logout: false,
        modalkehome: false
     }

     componentDidMount(){
         console.log('Status Login:' +this.props.Auth.login)
         console.log('Username:' +this.props.Auth.username)
         console.log('Password:' +this.props.Auth.password)
     }

    render() {
        if(this.state.logout && this.state.modalkehome){
            return(
                <Modal isOpen={this.state.modalkehome}>
                    <ModalHeader style={{backgroundColor:'#b21f66'}}>
                        You have been logged out!
                    </ModalHeader>
                    <ModalFooter>
                        <a href={'/'}>
                            <Button color="warning">Oke</Button>
                        </a>
                    </ModalFooter>
                </Modal>
            )
        }

        if(this.state.logout){
            localStorage.clear();
            this.setState({modalkehome:true})
            this.props.Loginthunk('','')
        }

        return ( 
            <div>
                <Modal isOpen={true} toggle={false}>
                    <ModalHeader style={{backgroundColor:'#b21f66'}}>
                        Are you sure want to logout?
                        <br></br>You haven't check this movie yet!
                    </ModalHeader>
                    <ModalBody className='trailer'>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/78v4SXh-KF8"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        ></iframe>
                        </ModalBody>
                    <ModalFooter>
                    <Link to={'/'}>
                        <Button color="warning" >Back to Home</Button>
                    </Link>
                    <Button color="danger" onClick={()=>{this.setState({logout:true})}}>Logout</Button>
                    </ModalFooter>
                </Modal>
            </div>
         );
    }
}

const MapstateToprops =(state)=>{
    return{
        Auth: state.Auth
    }
}
 
export default connect(MapstateToprops, {LoginSuccessAction,Loginthunk,Login_error}) (Logout);