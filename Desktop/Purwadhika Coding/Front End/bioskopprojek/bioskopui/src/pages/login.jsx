import React, { Component } from 'react';
import Axios from 'axios';
import { url } from '../support/ApiURL';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginSuccessAction, Loginthunk,Login_error } from './../redux/actions'

class Login extends Component {
    state = { 
        error: '',
        loading: false
     }

     onLoginClick =() =>{
         var username = this.refs.username.value
         var password = this.refs.password.value

         console.log('username: '+username)
         console.log('password: '+password)

        //  this.props.Loginthunk(username,password)

         Axios.get(`${url}users?username=${username}&password=${password}`)
         .then((res)=>{
             console.log(res.data[0])
            if(res.data.length){
                localStorage.setItem('dino',res.data[0].id)
                this.props.LoginSuccessAction(res.data[0])
            }
            else{
                this.setState({error: 'wrong username/password'})
            }
         }).catch((err)=>{
             console.log(err)
         })
     }

    render() {
        if(this.props.AuthLog){
            return <Redirect to={'/'} />
        }

        return ( 
            <div class="container">
                <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Log In</h5>
                        <form class="form-signin">
                        <div class="form-label-group">
                            <input type="text" ref="username" class="form-control" placeholder="Username" required autoFocus />
                            <label>Username</label>
                        </div>
                        <div class="form-label-group">
                            <input type="password" ref="password" class="form-control" placeholder="Password" required />
                            <label>Password</label>
                        </div>
                        <hr class="my-4" />
                        </form>
                    {this.state.error===''?
                        null:
                        <div className='alert alert-danger'>
                            {/* {this.props.Auth.error}  */}
                            {this.state.error}
                            <span onClick={()=>{this.setState({error:''})}} className='float-right font-weight-bold'>X</span>
                        </div>
                    }
                        <button class="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.onLoginClick} type="submit">Log in</button>
                        <div className='mt-2'>
                            <Link to={'/register'}> register </Link>
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
            AuthLog: state.Auth.login,
            Auth: state.Auth
        }
    }

export default connect(MapstateToprops, {LoginSuccessAction,Loginthunk,Login_error}) (Login);