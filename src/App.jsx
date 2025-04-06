import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import 'leaflet/dist/leaflet.css';


function App() {

  return (
    <>
      <div className="bg-extra-light dark:bg-text-dark text-text-dark dark:text-text-light p-4">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
