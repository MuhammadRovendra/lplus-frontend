import { Link } from "react-router-dom"
import { IMAGES } from "../../assets"

const About = () => {
  return(
    <div className="w-full h-auto lg:h-screen bg-unguTua">
      <div className=" h-full flex flex-wrap lg:flex-nowrap justify-center items-center px-10 md:px-30 gap-20 py-20">
        <div>
          <img className="w-full h-auto max-w-xs lg:max-w-md"  src={IMAGES.gambar3} alt="" style={{ maxWidth:'400px' }} />
        </div>
        <div className="text-white flex flex-col gap-3 w-fit">
          <p className="text-3xl font-bold uppercase text-center md:text-start">About <span className="text-yellow-500">LPLUS</span></p>
          <p className="text-justify">L Plus adalah tempat yang menyediakan sumber daya dan panduan untuk  belajar bahasa pemrograman dengan mudah. Kami memahami bahwa teknologi  memiliki potensi besar untuk mengubah dunia, dan pemrograman adalah  kunci untuk menguasai teknologi. Dalam dunia teknologi yang terus  berubah, kami berkomitmen untuk menyediakan edukasi berkualitas tinggi  tentang bahasa pemrograman yang sedang populer. Dengan materi  pembelajaran yang terstruktur dan forum komunitas aktif, kami membantu  pemula dan profesional dalam mengembangkan keterampilan yang diperlukan  untuk meraih kesuksesan di dunia teknologi yang dinamis. Bergabunglah  dengan kami di L Plus, dan mari bersama-sama membangun masa depan  teknologi yang cerah!</p>
          <Link to={'/about-page'} className="bg-kuning w-fit text-black font-semibold px-5 py-3 rounded-xl mx-auto">
            Selengkapnya..
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About