import React from 'react'
import Navbar from '../../../components/publicComponents/home/Navbar'
import HeroPage from '../../../components/publicComponents/home/HeroPage'
import CategoryPage from '../../../components/publicComponents/home/CategoryPage'
import AbouteUs from '../../../components/publicComponents/about/AbouteUs'
import ContactUs from '../../../components/publicComponents/contact/ContactPage'
import Footer from '../../../components/publicComponents/home/Footer'

function Home() {
  return (
    <>
    <div >
     <div className='bg-hero bg-cover'>
      <Navbar/>
      <HeroPage/>

     </div>

     <CategoryPage/>
     <AbouteUs/>
     <ContactUs/>
     <Footer/>

        

    </div>
      
   </>
  )
}

export default Home