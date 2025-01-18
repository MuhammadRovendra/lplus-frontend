import { useEffect, useState } from "react"
// import ServiceKategori from "../../api/service/Kategori.service"
import { IMAGES } from "../../assets"
import CourseItem from "./card/Course"
import ServiceNilai from "../../api/service/Nilai.service"
import { jwtDecode } from "jwt-decode"

const CourseComponent = () => {
  const [kategori, setKategori] = useState([])

  const getKategori = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const decode = jwtDecode(token)
      const id = decode.IDUSER
      const dataUser = await ServiceNilai.getNilai(id)
      console.log(dataUser)
      setKategori(dataUser.data[0].PROGRES)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getKategori()
  }, [])
  return(
    <>
      <div className="w-full h-auto lg:h-screen bg-unguTua overflow-hidden ">
        <div className="bg-abuAbu h-4/5 justify-center items-center">
          <div className="w-full h-full flex flex-col-reverse md:flex-row justify-center items-center px-5 text-justify md:px-44 py-5 md:py-2 mt-5">
            <div className="flex flex-col gap-3">
              <p className="font-extrabold text-2xl">COURSE <span className="text-unguMuda">LPLUS</span></p>
              <p className="text-sm">Mari temukan bahasa pemrograman yang sesuai dengan minat dan tujuan Anda! Dengan memilih bahasa pemrograman yang tepat, Anda dapat memulai perjalanan Anda dalam dunia coding dengan semangat dan keyakinan penuh. Ayo, mari kita mulai!</p>
            </div>
            <div>
              <img src={IMAGES.gambar2} alt="" style={{ maxWidth: "420px" }} />
            </div>
          </div>
        </div>
        <div className="bg-kuning h-auto py-10 flex justify-center items-center">
          <p className="text-3xl mt-auto uppercase font-extrabold text-center">Python Education</p>
        </div>
      </div>
      {
        kategori.map((item, index) => {
          // console.log(item)
          return (
            <div key={index+1}>
              <CourseItem dataCourse={item}/>
            </div>
          )
        })
      }
    </>
  )
}

export default CourseComponent