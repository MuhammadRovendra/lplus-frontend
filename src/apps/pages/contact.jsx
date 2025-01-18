
import { BiLogoGmail } from "react-icons/bi"
import { IMAGES } from "../assets"
import { FaDiscord, FaInstagram } from "react-icons/fa"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const Contact = () => {
  return(
    <>
      <Navbar transparant />
      <div className="w-full h-screen text-white py-18 px-32 bg-cover" style={{ backgroundImage: `url(${IMAGES.bg1})`, backgroundPositionX: '-90px' }}>
        <div className="flex flex-col gap-4 mt-20">
          <div className="bg-white text-black w-55 flex items-center ps-6 gap-2 py-2 rounded-full shadow-md">
            <BiLogoGmail className="text-2xl text-red-600" />
            <a href="/"> Lplus@gmail.com</a>
          </div>
          <div className="bg-white text-black w-55 flex items-center ps-6 gap-2 py-2 rounded-full shadow-md">
            <FaInstagram className="text-2xl text-pink-400" />
            <a href="/"> @Lplus_learning</a>
          </div>
          <div className="bg-white text-black w-55 flex items-center ps-6 gap-2 py-2 rounded-full shadow-md">
            <FaDiscord className="text-2xl text-indigo-600" />
            <a href="/"> Discord Lplus</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact