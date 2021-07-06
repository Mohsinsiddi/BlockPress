import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { GiCardExchange } from "react-icons/gi";
import {RiLoginBoxLine} from 'react-icons/ri'

export const SidebarData = [
  //{
  //   title: 'Patient Details',
  //   path: '/',
  //   icon: <AiIcons.AiFillHome />,
  //   cName: 'nav-text'
  // },
  {
    title: 'BlockPress DEX',
    path: '/decentralizedExchange',
    icon: <GiCardExchange />,
    cName: 'nav-text'
  },
  {
    title: 'NHI Updation',
    path: '/NHIUpdateDepartment',
    icon: <RiLoginBoxLine />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Reports',
  //   path: '/reports',
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Medicines',
  //   path: '/medicine',
  //   icon: <FaIcons.FaCartPlus />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Contact Team',
  //   path: '/contact',
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Messages',
  //   path: '/messages',
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: 'nav-text'
  // },
  
];