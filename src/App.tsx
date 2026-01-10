
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import ServiceSummary from './sections/ServiceSummary'
import Services from './sections/Services'
import ReactLenis from 'lenis/react'
import About from './sections/About'
import Works from './sections/Works'
import ContactSummary from './sections/ContactSummary'
function App() {
  return (
    <ReactLenis className="relative w-screen min-h-screen overflow-x-auto ">
      <Navbar/>
      <Hero/>
      <ServiceSummary/>
      <Services/>
      <About/>
      <Works/>
      <ContactSummary/>
      <section id='home' className='min-h-screen '/>
    </ReactLenis>
  )
}

export default App