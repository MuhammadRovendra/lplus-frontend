import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import Footer1 from "../../components/Footer/index copy"
import Layout from "../materi/Layout"
import DeskripsiBundle from "../../components/Materi/DeskripsiBundle"
import LoginPopUp from "../../components/PopUp/LoginPopUp"
import ServiceNilai from "../../api/service/Nilai.service"
import SweetAlertService from "../../helper/sweetalertService"
import { jwtDecode } from "jwt-decode"

const DeskripsiBundlePage = () => {
  const navigate = useNavigate()
  const { idBundle } = useParams()
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  const togglePopup = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if(!token){
        return setShowLoginPopup(true) // hanya menampilkan popup
      }
      let decodeToken = jwtDecode(token)
      
      const data = {
        IDUSER: decodeToken.IDUSER,
        IDKATEGORI: idBundle
      }

      const service = await ServiceNilai.CreateUserBundle(data)
      console.log(service)
      if (service.code === 200) {
        // User baru → semua materi STATUS === 0
        const firstMateri = service.data.MATERI[0];
        if (firstMateri) {
          return navigate(`/course-page/video-page/${idBundle}/${firstMateri.IDMATERI}`);
        }
      }

      if (service.code === 422) {
        // User sudah pernah ambil bundle, cari materi belum selesai
        const firstIncomplete = service.data.MATERI.find((materi) => materi.STATUS === 0);

        if (firstIncomplete) {
          return navigate(`/course-page/video-page/${idBundle}/${firstIncomplete.IDMATERI}`);
        } else {
          // Semua sudah complete → fallback ke materi pertama
          return navigate(`/course-page/video-page/${idBundle}/${service.data.MATERI[0].IDMATERI}`);
        }
      }

      // Fallback jika respons tidak dikenali
      SweetAlertService.showError("Error!", "Kode respons tidak dikenali");
    } catch (error) {
      SweetAlertService.showError("Error !", error.response.data.message)
    }
    // navigate('/course-page/video-page/:idMateri')
  }

  return (
    <>
      <Layout>
        <div>
          <DeskripsiBundle />
          <div className="absolute bottom-0 w-full">
            <div className="w-full text-black font-bold py-3 text-end px-10 bg-black-2">
              <button 
                className="px-8 py-2 rounded-xl bg-kuning" 
                onClick={togglePopup}
              >
                Mulai Materi
              </button>
            </div>
            <Footer1 />
          </div>
        </div>

        {/* Tampilkan pop-up kalau showLoginPopup true */}
        {showLoginPopup && (
          <LoginPopUp onClose={() => setShowLoginPopup(false)} />
        )}
      </Layout>
    </>
  )
}

export default DeskripsiBundlePage
