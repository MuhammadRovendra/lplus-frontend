import { useParams } from "react-router-dom"
import Footer1 from "../../components/Footer/index copy"
// import ContohCode from "../../components/Materi/ContohCode"
import Soal from "../../components/Materi/Soal"
// import RingkasanMateri from "../../components/Materi/Ringkasan"
// import VideoMateri from "../../components/Materi/Video"
import Navbar from "../../components/Navbar"
import SweetAlertService from "../../helper/sweetalertService"
import ServiceNilai from "../../api/service/Nilai.service"
import { jwtDecode } from "jwt-decode"


const SoalPage = () => {
  const {idMateri} = useParams()

  const Like = async (LikeStatus) => {
    try {
      const token = localStorage.getItem('accessToken')
      const idUser = jwtDecode(token).IDUSER
      const data = {
        IDMateri: idMateri,
        LIKE: LikeStatus
      }
      const response = await ServiceNilai.updateLike(idUser, data)
      console.log(response)
      return SweetAlertService.showSuccess('Berhasil Like', "berhasil")
      // return window.location.href = `http://localhost:5173/course-page`
    } catch (error) {
      SweetAlertService.showError("Error !", error)
    }
  }

  const handleNextPage = async () => {
    const token = localStorage.getItem('accessToken')
    const id = jwtDecode(token).IDUSER
    const cekLike = await ServiceNilai.getNilai(id)
    const dataMateri = cekLike.data[0].PROGRES[0].MATERI
    
    const findMateri = dataMateri.find(item => item.IDMATERI === idMateri)

    if(findMateri.LIKE === false){
      await SweetAlertService.confirmLike().then(async (e) => {
        if (e.isConfirmed) {
          await Like(findMateri.LIKE)
        }
      })
    }
    return window.location.href = `https://lplus-frontend.vercel.app/course-page`
  }

  const handlePreviousPage = () => {
    window.location.href = `/course-page/contoh-code-page/${idMateri}`
  }
  return(
    <div className="w-full h-auto flex flex-col justify-between bg-blue-gray-900">
      <Navbar />
      <Soal />
      <div>
        <div className="w-full text-black font-bold py-3 flex justify-between px-10 bg-black-2">
          <button className="px-8 py-2 rounded-xl bg-kuning" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="px-8 py-2 rounded-xl bg-kuning" onClick={handleNextPage}>
            Finish
          </button>
        </div>
        <Footer1 />
      </div>
    </div>
  )
}

export default SoalPage