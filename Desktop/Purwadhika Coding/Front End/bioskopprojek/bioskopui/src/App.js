import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Home from './pages/home'
import { Switch,Route } from 'react-router-dom'
import ManageAdmin from './pages/manageadmin';
import Login from './pages/login'
import Axios from 'axios';
import { url } from './support/ApiURL';
import { connect } from 'react-redux'
import { LoginSuccessAction,Notification } from './redux/actions'
import MovieDetail from './pages/moviedetail';
import Belitiket from './pages/belitiket';
import Register from './pages/register';
import Logout from './pages/logout';
import { Spinner } from 'reactstrap'
import Cart from './pages/cart';
import GantiPass from './pages/gantipass';
import History from './pages/history'
import Pagenotfound from './pages/page404';
import ManageStudio from './pages/managestudio';

class App extends Component {
  state={
    loading: true
  }
  componentDidMount(){
    var id=localStorage.getItem('dino')
    // console.log(id)
    Axios.get(`${url}users/${id}`)
    .then((res)=>{
      console.log(res.data)
      this.props.LoginSuccessAction(res.data)
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      this.setState({loading: false})
    })

    var jumlahnotif = localStorage.getItem('notif')
    // console.log(jumlahnotif)
    this.props.Notification(jumlahnotif)
    // console.log(this.props.Notif)
  }

  render(){
    if(this.state.loading){
      console.log('Ini loading!')
      return(
          <div>
              <Spinner type="grow" color="secondary" /> 
              <Spinner type="grow" color="info" /> 
              <Spinner type="grow" color="warning" /> 
          </div>
          )
    }
    else{
      return (
        <div className="App">
          <Header />
          <Switch>

            <Route exact path="/" component={Home}/>
            <Route exact path="/managemovie" component={ManageAdmin} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/moviedetail/:id" component={MovieDetail} />
            <Route exact path="/belitiket" component={Belitiket} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/ganti" component={GantiPass} />
            <Route exact path="/history" component={History} />
            <Route exact path="/studio" component={ManageStudio} />
            <Route path="/*" component={Pagenotfound} />

          </Switch>
        </div>
      );
    }
  }
}

const MapstateToprops = (state) =>{
  return{
    AuthLog : state.Auth.login,
    Notif: state.Notif
  }
}

export default connect(MapstateToprops, {LoginSuccessAction, Notification})(App);
