import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Web3 from 'web3';
import {Healthcare} from "./components/js/Healthcare.js"
import Identicon from "identicon.js";
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import {RiGovernmentFill,RiLoginBoxLine} from 'react-icons/ri'
import { MdLocalPharmacy } from "react-icons/md";

const web3 = new Web3(Web3.givenProvider);


function Navbar(props) {
  let history = useHistory()
  async function loginPat (){
       
    const flag = await props.contract.methods.verifyPatient(props.account).call();
    if (flag == true)
      return history.push('/patient');
    else
     alert('You are not a registered Patient in this platform');
  }
  async function loginDoc (){
    
      const flag = await props.contract.methods.verifyDoctor(props.account).call();
      if (flag == true)
        return history.push('/doctor');
      else
       alert('You are not a registered Doctor in this platform');
    }
    async function loginPharm (){
     
      const flag = await props.contract.methods.verifyTechnician(props.account).call();
      if (flag == true)
        return history.push('/technician');
      else
       alert('You are not a registered Pharmacy in this platform');
    }
    async function loginSuper (){
     
      
      const flag = await props.contract.methods.verifySuper(props.account).call();
      if (flag == true)
        return history.push('/moh');
      else
       alert('You are not the Ministry of Health in this platform');
    }
    async function loginState (){
     
      
      const flag = await props.contract.methods.verifyStateAdmin(props.account).call();
      if (flag == true)
        return history.push('/dhb');
      else
       alert('You are not the registered DHB in this platform');
    }
    async function loginAdmin (){
      
      const flag = await props.contract.methods.verifyAdmin(props.account).call();
      if (flag == true)
        return history.push('/admin');
      else
       alert('You are not a registered hospital Admin in this platform');
    }
    async function loginRecep (){
     
      const flag = await props.contract.methods.verifyReceptionist(props.account).call();
      if (flag == true)
        return history.push('/reception/addpatient');
      else
       alert('You are not a registered Receptionist in this platform');
    }

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
         <div style={{float:'left'}}>
         <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
         </div>
         
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
           
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
          
            <li className='nav-text'>
              <Link onClick={loginPat}>
              <IoIcons.IoMdPeople />
                <span>PATIENT</span>
              </Link>
            </li>
            <li className='nav-text'>
              <Link onClick={loginDoc}>
              <IoIcons.IoMdPeople />
                <span>DOCTOR</span>
              </Link>
            </li>
            <li className='nav-text'>
              <Link onClick={loginAdmin}>
              <FaIcons.FaHospitalAlt />
                <span>HOSPITAL</span>
              </Link>
            </li>
            <li className='nav-text'>
              <Link onClick={loginState}>
              <RiGovernmentFill />
                <span>HEALTH-NZ</span>
              </Link>
            </li>
            <li className='nav-text'>
              <Link onClick={loginRecep}>
              <GiIcons.GiNurseFemale />
                <span>RECEPTIONIST</span>
              </Link>
            </li>
            <li className='nav-text'>
              <Link onClick={loginPharm}>
              <MdLocalPharmacy />
                <span>PHARMACIST</span>
              </Link>
            </li>
            <li className='nav-text'>
              <Link onClick={loginSuper}>
               <RiGovernmentFill />
                <span>MINISTRY OF HEALTH</span>
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          
             
          
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;