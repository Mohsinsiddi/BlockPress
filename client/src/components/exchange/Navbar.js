import React, { Component } from 'react';
import Identicon from "identicon.js";
import {Link} from 'react-router-dom';
import logo from "../../Logo.png";
class Navbar extends Component {
  
  render() {
    return (
      <div>
         <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            {/* <div
              className="nav-item active"
              style={{ color: "black", fontWeight: "bolder" }}
            >
              <img src={logo} width="50px" height="50px" />
            </div> */}
             <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            // target="_blank"
            rel="noopener noreferrer"
          >
            BlockPress DEX
          </a>
            <ul className="navbar-nav ml-auto">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                 <small className="text-secondary">
                         <small id="account" style={{color:"lightblue" ,fontSize:"18px"}}>{this.props.account}</small>
                 </small>
                 {this.props.account
             ?<img
             className="ml-2"
             width='24' 
             height='24' 
             src={`data:image/png;base64,${new Identicon(this.props.account,30).toString()}`}
             alt=""
             />
             :<span></span>
            }
             </li>
              <li className="nav-item ml-auto">
                <Link to="/">
                  <a className="nav-link" style={{ color: "white" }}>
                    Go to BlockPress!
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        
      </div>
    );
  }
}

export default Navbar;
