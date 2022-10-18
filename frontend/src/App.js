import React,{useState,useEffect} from 'react'
import './App.css'
import Header from './components/Header/Header'

import RootsChange from './Routes/RootChange'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'

export default function App() {
  
  return (
    <div>
  
    <Header />
   
    <RootsChange/>

    <ToastContainer position="bottom-right"/>


    </div>
  );
}
