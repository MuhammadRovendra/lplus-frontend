
import { BiLogoGmail } from "react-icons/bi"
import { IMAGES } from "../../assets"
import { FaDiscord, FaInstagram } from "react-icons/fa"


const Contact = () => {
  return(
    <div className="w-full h-auto text-white py-18 px-32" style={{ backgroundImage: `url(${IMAGES.bg2})`, backgroundPositionY: '440px' }}>
      <div className="flex  flex-col gap-5">
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
  )
}

export default Contact