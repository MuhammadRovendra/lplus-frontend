import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Course from "../components/Course"
import Footer from "../components/Footer"
import Contact from "../components/Contact"

const LandingPage = () => {
  return (
    <>
      <Navbar transparant />
      <Hero />
      <Course />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

export default LandingPage