import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/services/Services'
import Doctors from '../components/doctors/Doctors'
import Contact from '../components/contact/Contact'

const Home = () => {
  return (
    <>
        <Hero/>
        <Services/>
        <Doctors/>
        <Contact/>
    </>
  )
}

export default Home