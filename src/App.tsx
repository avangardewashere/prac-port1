import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import ServiceSummary from './sections/ServiceSummary'

function App() {
  return (
    <div className="relative w-screen min-h-screen overflow-x-auto ">
      <Navbar/>
      <Hero/>
      <ServiceSummary/>
      <section id='home' className='min-h-screen '/>
     
    </div>
  )
}

export default App