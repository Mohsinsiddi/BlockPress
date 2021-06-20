import React from "react";
import {  Link } from "react-router-dom";
import "../style.css";
import logo from "../../src/Logo.png"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Employee from "./.cph/app"
class addPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      nationality:"",
      birthPlace:"",
       dob:"",
    }
  }
    render() {
      return (
        <div>
          <nav className="navbar navbar-expand-sm bg-dark navbar-light">
            <div
              className="nav-item active"
              style={{ color: "black", fontWeight: "bolder" }}
            >
              <img src={logo} width="50px" height="50px" />
            </div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link" style={{ color: "white" }}>
                    HOME
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="container" style={{ padding: "10%" }}>
            <h3 className="text-center">ADD A PATIENT</h3>
            <br />
            <input className="form-control" placeholder="Enter Patient's Name"  onChange={(e) => { this.setState({ name: e.target.value }) }}/>
            <br />
            <br />
            <input className="form-control" placeholder="Enter Patient's Nationality"  onChange={(e) => { this.setState({ nationality: e.target.value }) }}/>
            <br />
            <br />
            <input className="form-control" placeholder="Enter Patient's Birth Place"  onChange={(e) => { this.setState({ birthPlace: e.target.value }) }}/>
            <br />
            <br />
            <input className="form-control" placeholder="Enter Patient's Date"  onChange={(e) => { this.setState({ dob: e.target.value }) }}/>
            <br />
            <Employee 
            data={{
              "name":this.state.name,
               "nationality":this.state.nationality,
               "birthPlace":this.state.birthPlace,
               "dob":this.state.birthPlace
            }}
             from={"recepPat"}/>
          </div>
        </div>
      );
    }
  }
  
  export default addPatient;