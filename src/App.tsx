import React from 'react'
import Navbar from './sections/Navbar'

function App() {
  return (
    <div className="relative w-screen min-h-screen overflow-x-auto ">
      <Navbar/>
      <section id='home' className='min-h-screen '/>
      <section id='services' className='min-h-screen '/>
      <section id='about' className='min-h-screen '/>
      <section id='work' className='min-h-screen '/>
      <section id='contact' className='min-h-screen '/>
    </div>
  )
}

export default App