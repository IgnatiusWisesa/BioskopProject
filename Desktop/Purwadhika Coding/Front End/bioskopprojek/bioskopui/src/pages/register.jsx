import React, { Component } from 'react';
import { url } from '../support/ApiURL';
import Axios from 'axios';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'

class Register extends Component {
    state = { 
        passerror:false,
        statusoke: false,
        modalsudahdigunakan: false,
        // usernamebaru: [],
        // passwordbaru: [],
        modalberhasil:false,
        respon:'',
        resp: false
     }

     onRegisterClick=()=>{
        var username = this.refs.username.value
        var password = this.refs.password.value
        var konfpassword = this.refs.konfpassword.value

        console.log('username: '+username)
        console.log('password: '+password)
        console.log('konf password: '+konfpassword)

         if(password!==konfpassword){
             this.setState({passerror:true})
         }
         else{
            // this.setState({usernamebaru:username})
            // this.setState({passwordbaru:password})
            var userbaru={username,password}
            console.log(userbaru)
            Axios.get(`${url}users?username=${username}`)
            .then((res)=>{
                this.setState({respon:res.data, resp:true})
                if(this.state.respon[0]){
                    console.log('data sudah digunakan')
                    this.setState({modalsudahdigunakan:true})
                }else{
                    console.log('data belum digunakan')
                    Axios.post(`${url}users`,userbaru)
                    .then(()=>{
                        this.setState({modalberhasil:true})
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
         }
    }

    render() {
        return ( 
            <div class="container">
                <Modal isOpen={this.state.modalberhasil} toggle={()=>this.setState({modalberhasil:false})}>
                    <ModalHeader style={{backgroundColor:'#b21f66'}}>
                        Register Success!
                        <br></br>Please Proceed to Login Page
                    </ModalHeader>
                        <Link to={'/login'}>
                            <Button color="warning" style={{width:'500px'}}>Oke!</Button>
                        </Link>
                </Modal>
                <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Register to Watch</h5>
                        <form class="form-signin">
                        <div class="form-label-group">
                            <input type="text" ref="username" class="form-control" placeholder="Username" required autoFocus />
                            <label>Username</label>
                        </div>
                        <div class="form-label-group">
                            <input type="password" ref="password" class="form-control" placeholder="Password" required />
                            <label>Password</label>
                        </div>
                        <div class="form-label-group">
                            <input type="password" ref="konfpassword" class="form-control" placeholder="Confirm Password" required />
                            <label>Confirm Password</label>
                        </div>
                        <hr class="my-4" />
                        </form>
                        {this.state.passerror===false?
                            null:
                            <div className='alert alert-danger'>
                                Password do not match!
                                <span onClick={()=>this.setState({passerror:false})} className='float-right font-weight-bold'>X</span>
                            </div>
                        }
                        {this.state.modalsudahdigunakan===false?
                            null:
                            <div className='alert alert-danger'>
                                Username already used!
                                <span onClick={()=>this.setState({modalsudahdigunakan:false})} className='float-right font-weight-bold'>X</span>
                            </div>
                        }
                        <button class="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.onRegisterClick} type="submit">Register</button>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default Register;