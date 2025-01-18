import { IMAGES } from "../../assets"

const Hero = () => {
  return(
    <div className="w-full h-screen bg-unguTua">
      <div className="me-0 lg:mx-16 h-full flex flex-wrap md:flex-nowrap justify-center items-center px-5 gap-3 md:gap-0 py-10">
        <div>
          <img src={IMAGES.gambar1} alt="" style={{ maxWidth: '500px' }} className="w-full h-auto max-w-xs lg:max-w-md"/>
        </div>
        <div className="text-white flex flex-col text-center md:text-start gap-3">
          <p className="text-3xl font-bold uppercase">Selamat Datang di <span className="text-kuning">LPLUS</span></p>
          <div>
            <p>Temukan kemudahan belajar bahasa pemrograman </p>
            <p>yang sedang populer di Lplus !</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero