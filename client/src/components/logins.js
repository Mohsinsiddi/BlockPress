import React from "react";
import {  Link } from "react-router-dom";
import "../style.css";
import logo from "../../src/Logo.png"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Employee from "./.cph/app"
import Navbar from "../Navbar";
import Web3 from 'web3';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import {Healthcare} from './js/Healthcare'

class logins extends React.Component {


    async componentWillMount() {
        console.log("in component will mount");
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
      
      constructor(props) {
        super(props);
        this.state = {
          name:""
        }
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


      async loginDoc (){
    
        console.log("hi");
        const flag = await this.state.contract.methods.verifyDoctor(this.state.account).call();
        console.log(flag)
        if (flag == true)
          return this.props.history.push('/doctor');
        else
         alert('You are not a registered doctor in this platform');
      }
      async loginPat (){
       
        const flag = await this.state.contract.methods.verifyPatient(this.state.account).call();
        if (flag == true)
          return this.props.history.push('/patient');
        else
         alert('You are not a registered patient in this platform');
      }
      async loginLab (){
       
        const flag = await this.state.contract.methods.verifyTechnician(this.state.account).call();
        if (flag == true)
          return this.props.history.push('/technician');
        else
         alert('You are not a registered lab technician in this platform');
      }
      async loginSuper (){
       
        
        const flag = await this.state.contract.methods.verifySuper(this.state.account).call();
        if (flag == true)
          return this.props.history.push('/superadmin');
        else
         alert('You are not the super admin in this platform');
      }
      async loginState (){
       
        
        const flag = await this.state.contract.methods.verifyStateAdmin(this.state.account).call();
        if (flag == true)
          return this.props.history.push('/stateadmin');
        else
         alert('You are not the registered state admin in this platform');
      }
      async loginAdmin (){
        
        const flag = await this.state.contract.methods.verifyAdmin(this.state.account).call();
        if (flag == true)
          return this.props.history.push('/admin');
        else
         alert('You are not a registered hospital admin in this platform');
      }
      async loginRecep (){
       
        const flag = await this.state.contract.methods.verifyReceptionist(this.state.account).call();
        if (flag == true)
          return this.props.history.push('/reception/addpatient');
        else
         alert('You are not a registered receptionist in this platform');
      }
      redirect = () => {
        window.location.href = 'http://localhost:5000/hss';
        // maybe can add spinner while loading
        return null;
      }

  
    render() {
      return (
        <div>
         <Navbar/>


         <div className="drop">
         
           
           
           <DropdownButton id="dropdown-basic-button" title="LOGIN AS ENTITY :-">
           <Dropdown.Item id="loginbtnAdmin"><button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginSuper()}>
           MINISTRY OF HEALTHS 
                </button></Dropdown.Item>
           <Dropdown.Item id="loginbtnAdmin"> <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginState()}>
                {/* STATEADMIN */}
               DHBs
             </button></Dropdown.Item>
           <Dropdown.Item id="loginbtnAdmin"><button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginAdmin()}>
           HOSPITAL ADMINISTRATORS  
                </button></Dropdown.Item>
           <Dropdown.Item id="loginbtnentities"> <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginDoc()}>
                  DOCTOR
                </button></Dropdown.Item>
           <Dropdown.Item id="loginbtnentities"> <button  type="button" className="btn btn-success hover-effect" onClick={()=>this.loginPat()}>
                  PATIENT
                </button></Dropdown.Item>
           <Dropdown.Item id="loginbtnentities"> <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginLab()}>
                  {/* LAB TECHNICIAN */}
                  PHARMACIST
                </button></Dropdown.Item>
           <Dropdown.Item id="loginbtnentities"> <button type="button" className="btn btn-success hover-effect" onClick={()=>this.loginRecep()}> 
                  RECEPTIONIST
                </button></Dropdown.Item>
           {/* <Dropdown.Item id="loginbtnentities">LABOTARISTS</Dropdown.Item>
           <Dropdown.Item id="loginbtnentities">RADIOLOGISTS</Dropdown.Item> */}
           </DropdownButton>
           
         </div>
         
        <div
          className="footer-clean"
          style={{
            color: "white",
            backgroundColor: "#2e5666",
            fontWeight: "500",
            padding:"5%",
            marginTop:"300px"
            
          }}>
          <footer>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-sm-4 col-md-3 item">
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
                </div>
                <p className="copyright" style={{ marginTop: "10px"}}>
                    EHR&nbsp; ©&nbsp; All Rights reserved. 2020
                  </p>
              </div>
            </div>
          </footer>
        </div>

        </div>
      );
    }
  }
  
export default logins;