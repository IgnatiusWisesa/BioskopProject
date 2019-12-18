import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FiShoppingCart } from 'react-icons/fi'
import Axios from 'axios';
import { url } from '../support/ApiURL';
import { Notification } from './../redux/actions'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  // console.log(props.username)
  
  // console.log(props.Notif[0])

  return (
    <div>
      <Navbar light expand='ml'>

        {props.username===''?
        (null):(
          <div>
            <div style={{width:'30px'}}>
              <h4 style={{fontFamily:'Anton',color:'#b21f66'}}>Welcome {props.username.toUpperCase()}!</h4>
            </div>
            <div>
              <Link to="/ganti" style={{color:'black'}}>Change Password</Link>
            </div>
            <div>
              <Link to="/logout" style={{color:'black'}}>Logout</Link>
            </div>
            <br></br>
            {props.username==='admin'?
            (null):(
            <div>
              <a href={'/cart'}>
                <FiShoppingCart style={{fontSize:28, color:'#b21f66'}} />&nbsp;<span style={{fontSize:20, color:'#b21f66'}}>{props.Notif[0]}</span>
              </a>
            </div>
            )
            }
          </div>
        )
        }

        <NavbarBrand href="/"><h2>Magnificent Cinema Studios</h2></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {props.username!=='admin'?(
              <NavItem class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavItem>
                  <Link to="/" style={{color:'black'}} className='komponen'>Back To Home</Link>
                </NavItem>
                <NavItem>
                  <Link to="/register" style={{color:'black'}} className='komponen'>Register</Link>
                  &nbsp;&nbsp;
                  <Link to="/login" style={{color:'black'}} className='komponen'>Login</Link>
                </NavItem>
                <NavItem>
                  <Link to="/history" style={{color:'black'}} className='komponen'>History</Link>
                </NavItem>
              </NavItem>
            ):
            (
              <NavItem class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <NavItem>
                <Link to="/managemovie" style={{color:'black'}} className='komponen'>Manage Movie</Link>
              </NavItem>
              <NavItem>
                <Link to="/studio" style={{color:'black'}} className='komponen'>Manage Studio</Link>
              </NavItem>
              </NavItem>
            )
            }
            {/* <NavItem>
              <Link to="/" style={{color:'black'}} className='komponen'>Back To Home</Link>
            </NavItem>
            <NavItem class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link to="/register" style={{color:'black'}} className='komponen'>Register</Link>
              &nbsp;&nbsp;
              <Link to="/login" style={{color:'black'}} className='komponen'>Login</Link>
            </NavItem>
            <NavItem>
              <Link to="/history" style={{color:'black'}} className='komponen'>History</Link>
            </NavItem>
            <NavItem>
              <Link to="/manageadmin" style={{color:'black'}} className='komponen'>Admin</Link>
            </NavItem>
            <NavItem>
              <Link to="/studio" style={{color:'black'}} className='komponen'>Manage Studio</Link>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const MapstateToprops=(state)=>{
  return{
      username:state.Auth.username,
      Notif: state.Notif
  }
}

export default connect(MapstateToprops, {Notification}) (Header);