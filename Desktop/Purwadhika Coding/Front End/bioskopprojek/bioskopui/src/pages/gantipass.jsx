import React, { Component } from 'react';
import Axios from 'axios';
import { url } from '../support/ApiURL';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginSuccessAction, Loginthunk,Login_error } from './../redux/actions'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'

class GantiPass extends Component {
    state = { 
        passerror:false,
        modalSalahPass: false,
        modalberhasil:false
    }

    onPassChange =()=>{
        var oldpass = this.refs.oldpass.value
        var newpass = this.refs.newpass.value
        var konfpassword = this.refs.konfpassword.value
        var username = this.props.Auth.username
        var id = this.props.Auth.id

        console.log('username: '+oldpass)
        console.log('password: '+newpass)
        console.log('konf password: '+konfpassword)
        console.log('username: '+username)

        var putbaru = {
            username:username,
            password: newpass,
            id: id
        }

        if(newpass!==konfpassword){
            this.setState({passerror:true})
        }
        else{
            Axios.get(`${url}users?username=${username}`)
            .then((res)=>{
                if(res.data[0].password!==oldpass){
                    console.log('konfirmasi pass lama salah, tampilkan eror')
                    this.setState({
                        modalSalahPass:true
                    })
                }
                else{
                    console.log('konfirmasi pass benar')
                    Axios.put(`${url}users/${id}`,putbaru)
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
            <div>
            <div class="container">
                <Modal isOpen={this.state.modalberhasil} toggle={()=>this.setState({modalberhasil:false})}>
                    <ModalHeader style={{backgroundColor:'#b21f66'}}>
                        Password Successfully Changed!
                    </ModalHeader>
                        <Link to={'/'}>
                            <Button color="warning" style={{width:'500px'}}>Oke!</Button>
                        </Link>
                </Modal>
                <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Change Password</h5>
                        <form class="form-signin">
                        <div class="form-label-group">
                            <input type="text" ref="oldpass" class="form-control" placeholder="Old Password" required autoFocus />
                            <label>Old Password</label>
                        </div>
                        <div class="form-label-group">
                            <input type="password" ref="newpass" class="form-control" placeholder="New Password" required />
                            <label>New Password</label>
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
                        {this.state.modalSalahPass===false?
                            null:
                            <div className='alert alert-danger'>
                                You enter a wrong password!
                                <span onClick={()=>this.setState({modalSalahPass:false})} className='float-right font-weight-bold'>X</span>
                            </div>
                        }
                        <button class="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.onPassChange} type="submit">Submit</button>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
         );
    }
}

const MapstateToprops =(state)=>{
    return{
        Auth: state.Auth
    }
}
 
export default connect(MapstateToprops)(GantiPass);