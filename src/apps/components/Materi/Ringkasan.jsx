import { useParams } from "react-router-dom"
// import { IMAGES } from "../../assets"
import ServiceMateri from "../../api/service/Materi.service"
import { useEffect, useState } from "react"

const RingkasanMateri = () => {
  const {idMateri} = useParams()
  const [teks, setTeks] = useState('')
  // console.log(idMateri)

  const getMateri = async () => {
    try {
      const dataMateri = await ServiceMateri.getMateriById(idMateri)
      const teksMateri = dataMateri.data.MATERI
      console.log(teksMateri)
      const paragraphs = teksMateri?.split(/(?<=\.)\s+/);
      console.log(paragraphs)
      setTeks(paragraphs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMateri()
  }, [])
  return (
    <div className="w-full h-full bg-blue-gray-50 py-20 px-20">
      <p className="text-3xl font-bold text-black">RINGKASAN <span className="text-unguMuda">MATERI</span></p>
      <div className="flex flex-col items-center mt-20">
        <div className="h-full flex flex-col justify-center gap-2">
          {/* <img className="" src={IMAGES.gambar1} alt="" style={{ maxWidth: '500px', height: '370px' }}/> */}
          {teks.length > 0 ? (
            teks.map((item, index) => (
              <p key={index} className="text-lg leading-relaxed text-black text-justify">{item}</p>
            ))
          ) : (
            <p>Loading...</p> // Menampilkan loading jika teks masih kosong
          )}
        </div>
      </div>
    </div>
  )
}

export default RingkasanMateri