import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import "./style.css";
import logo from "./Logo.png";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import loginDoctor from "./components/loginDoctor.js";
import logins from "./components/logins";
import addPatient from "./components/addPatient.js";
import addReception from "./components/addReception.js";
import addLab from "./components/addLab.js";
import addDoctor from "./components/addDoctor.js";
import Admin from "./components/Admin.js";
import superAdmin from "./components/superAdmin.js";
import stateAdmin from "./components/addHospital.js";
import loginTechnician from "./components/loginTechnician.js";
 import revoke from "./components/revoke.js";
 import permit from "./components/permit.js";
import loginPatient from "./components/loginPatient.js";
import Web3 from 'web3';
import {Healthcare} from "./components/js/Healthcare.js"

import Navbar from "./Navbar"
import dhb from "./components/DHB";
import addHospital from "./components/addHospital.js";
import addPharmacy from "./components/addPharmacy";
import MOH from "./components/superAdmin.js";
import App from "./components/exchange/App";
import NHI from "./components/updateNHI";
import viewPatient from "./components/viewPatientDetails";
import FormTXt from "./components/formtxt";

class application extends React.Component {

  async componentWillMount() {
    console.log("in component will mount");
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    console.log("inweb3");
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    //const networkId = await web3.eth.net.getId()
    //const networkData = Healthcare.networks[networkId]
   
      const contract = new web3.eth.Contract(Healthcare, "0x5f6AFc499b79b97ad5c84CB2A315db16B5304B1b")
      this.setState({ contract })
     

   
    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
   
  }

  constructor(props) {
    super(props);
    this.state = {
     
      web3: null,
      contract: null,
      account: null,
      buffer: null,
    }
  }
  // async loginDoc (){
    
  //   console.log("hi");
  //   const flag = await this.state.contract.methods.verifyDoctor(this.state.account).call();
  //   if (flag == true)
  //     return this.props.history.push('/doctor');
  //   else
  //    alert('You are not a registered doctor in this platform');
  // }
  // async loginPat (){
   
  //   const flag = await this.state.contract.methods.verifyPatient(this.state.account).call();
  //   if (flag == true)
  //     return this.props.history.push('/patient');
  //   else
  //    alert('You are not a registered patient in this platform');
  // }
  // async loginLab (){
   
  //   const flag = await this.state.contract.methods.verifyTechnician(this.state.account).call();
  //   if (flag == true)
  //     return this.props.history.push('/technician');
  //   else
  //    alert('You are not a registered lab technician in this platform');
  // }
  // async loginSuper (){
   
    
  //   const flag = await this.state.contract.methods.verifySuper(this.state.account).call();
  //   if (flag == true)
  //     return this.props.history.push('/superadmin');
  //   else
  //    alert('You are not the super admin in this platform');
  // }
  // async loginState (){
   
    
  //   const flag = await this.state.contract.methods.verifyStateAdmin(this.state.account).call();
  //   if (flag == true)
  //     return this.props.history.push('/stateadmin');
  //   else
  //    alert('You are not the registered state admin in this platform');
  // }
  // async loginAdmin (){
    
  //   const flag = await this.state.contract.methods.verifyAdmin(this.state.account).call();
  //   if (flag == true)
  //     return this.props.history.push('/admin');
  //   else
  //    alert('You are not a registered hospital admin in this platform');
  // }
  // async loginRecep (){
   
  //   const flag = await this.state.contract.methods.verifyReceptionist(this.state.account).call();
  //   if (flag == true)
  //     return this.props.history.push('/reception/addpatient');
  //   else
  //    alert('You are not a registered receptionist in this platform');
  // }
  redirect = () => {
    window.location.href = 'http://localhost:5000/hss';
    // maybe can add spinner while loading
    return null;
  }
  render() {
    return (
      <div id ='patient' className="App">


        <div className="bg-light text-dark">

          {/* <nav className="navbar navbar-expand-sm bg-dark navbar-light">
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
                <Link to="/">
                  <a className="nav-link" style={{ color: "white" }}>
                    ABOUT 
                  </a>
                </Link>
                <Link to="/">
                  <a className="nav-link" style={{ color: "white" }}>
                    CONTACT
                  </a>
                </Link>
                </li>
              <li className="nav-item">
                <a className="nav-link" style={{ color: "white" }} href='http://localhost:5000/hss'>
                    DEMO 
                  </a>
                  </li>
              
            </ul>
          </nav> */}
          <Navbar contract={this.state.contract} account={this.state.account}/>
          <div className='Header'>
            <br />
            <br />
            <br />
            <br /><br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <header className="text-center" >
              <h1 className="fontColor" style={{color:'rgb(136, 247, 136)'}}>BlockPres</h1>
              <h3 className="fontColor">A Blockchain | Decentralized based Prescription Managemnet System</h3>
              <p></p>
              <p></p>
              <p>A system on Blockchain where patients can do their prescription managemnet very securely</p>
            </header>
            {/* <br />
            <br />
            <br />
            <br />
            <br /> */}
          </div>
          {/* <div
            className="row text-center my-5 "
            style={{ paddingBottom: "1%" }}
          >

            <div className="col-md-4">
              
                <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginDoc()}>
                  DOCTOR
                </button>
             
            </div>
            <div className="col-md-4">
              
                <button  type="button" className="btn btn-success hover-effect" onClick={()=>this.loginPat()}>
                  PATIENT
                </button>
             
            </div>
            <div className="col-md-4">
              
                <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginLab()}>
                  //  LAB TECHNICIAN 
                  PHARMACIST
                </button>
              
            </div>
          </div>
          <div
            className="row text-center my-5 "
            style={{ paddingBottom: "1%" }}
          >
            <div className="col-md-12 my-5 text-center" style={{marginLeft:'300px !important'}}>              
                <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginRecep()}> 
                  RECEPTIONIST
                </button>
             
            </div>
          </div>

          <div
            className="row text-center my-5 "
            style={{ paddingBottom: "10%" }}
          >
            <div className="col-md-4">
             
                <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginSuper()}>
                  SUPERADMIN
                </button>
             
            </div>
            <div className="col-md-4">
             
             <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginState()}>
               STATEADMIN
             </button>
          
         </div>
            <div className="col-md-4">
              
                <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginAdmin()}>
                  HOSPITAL ADMIN
                </button>
             
            </div>

          </div> */}
        </div>

        <div
          className="footer-clean"
          style={{
            color: "white",
            backgroundColor: "#2e5666",
            fontWeight: "500",
            padding:"5%",
          }}>
          <footer>
            <div className="container">
              <div className="row justify-content-center">
                {/* <div className="col-sm-4 col-md-3 item">
                  <p
                    style={{
                      color: "white",
                      fontSize: "15px",
                      lineHeight: "28px",
                      fontWeight: 100,
                    }}>
                    Phone : 1800 2255 00 <br />
                    E-mail: info@ehealthrecord.com
                  </p>
                </div> */}
                <p className="copyright" style={{ marginTop: "10px"}}>
                    BlockPres&nbsp; ©&nbsp; All Rights reserved. 2020
                  </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
export default application;

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={application} />
      <Route exact path="/logins" component={logins} />
      <Route exact path="/doctor" component={loginDoctor} />
      <Route exact path="/patient" component={loginPatient} />
      <Route exact path="/revoke" component={revoke} />
      <Route exact path="/permit" component={permit} />
      <Route exact path="/technician" component={loginTechnician} />
      <Route exact path="/moh" component={MOH} />
      <Route exact path="/addHospital" component={addHospital} />
      <Route exact path="/addPharmacy" component={addPharmacy} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/admin/adddoctor" component={addDoctor} />
      <Route exact path="/admin/addlab" component={addLab} />
      <Route exact path="/admin/addreception" component={addReception} />
      <Route exact path="/reception/addpatient" component={addPatient} />
      <Route exact path="/dhb" component={dhb} />
      <Route exact path="/decentralizedExchange" component={App} />
      <Route exact path="/NHIUpdateDepartment" component={NHI} />
      <Route exact path="/viewPatientDetails" component={viewPatient} />
      <Route exact path="/formTxt" component={FormTXt}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
