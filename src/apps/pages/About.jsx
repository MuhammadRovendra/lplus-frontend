import { IMAGES } from "../assets"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"


const About = () => {
  return(
    <>
      <Navbar />
      <div className="w-full h-auto bg-unguTua text-white">
        <div className="h-full flex flex-col py-24 px-3 md:px-10 items-center gap-7">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-3xl md:text-4xl font-bold uppercase">Selamat Datang di <span className="text-kuning">L PLUS</span></p>
            <p className="text-xl md:text-2xl font-semibold">Tempat Anda untuk Menguasai Bahasa Pemrograman!</p>
          </div>
          <div className="flex flex-row gap-5 ">
            <div className="w-4/6 h-auto hidden xl:flex flex-col justify-between">
              <img className="h-fit rounded-md" src={IMAGES[1]} alt="" style={{width: "200px"}}/>
              <img className="h-fit rounded-md mb-28" src={IMAGES[2]} alt="" style={{width: "200px", height: "125px"}}/>
            </div>
            <div className="text-justify font-semibold text-base md:text-lg flex flex-col gap-5">
              <p className="">Kami di L Plus dengan sungguh-sungguh meyakini bahwa teknologi memiliki kekuatan luar biasa untuk merubah dunia menjadi lebih baik. Kami percaya bahwa kunci utama untuk memahami dan menguasai teknologi ini terletak pada penguasaan bahasa pemrograman. Di era yang penuh dengan perubahan cepat dalam industri teknologi, kami mengakui pentingnya untuk selalu mengembangkan dan memperbarui pengetahuan serta keterampilan kita.</p>

              <p className="">L Plus hadir untuk memenuhi kebutuhan itu. Kami adalah sumber daya online yang berkomitmen untuk memberikan edukasi berkualitas tinggi tentang bahasa pemrograman yang sedang populer di industri saat ini. Dengan panduan yang jelas dan materi pembelajaran yang terstruktur, kami membantu pemula dan profesional untuk menguasai keterampilan pemrograman yang diperlukan untuk sukses di dunia teknologi yang dinamis.</p>

              <p className="">Apa pun tujuan Anda dalam mempelajari pemrograman - mulai dari membangun aplikasi web, mengembangkan perangkat lunak, hingga menjadi ahli data - kami memiliki sumber daya yang sesuai untuk membantu Anda mencapai impian Anda. Selain itu, kami menyediakan forum komunitas aktif di mana Anda dapat berbagi pengetahuan, bertanya pertanyaan, dan terhubung dengan sesama pembelajar.</p>

              <p className="">Bergabunglah dengan kami di L Plus dan mulailah perjalanan Anda untuk menjadi ahli dalam bahasa pemrograman yang sedang tren dan relevan. Mari kita bersama-sama membangun masa depan teknologi yang cerah!</p>
            </div>
            <div className="w-4/6 h-auto hidden xl:flex items-center">
              <img className="h-fit rounded-md mb-24" src={IMAGES[3]} alt="" style={{width: "200px"}}/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About