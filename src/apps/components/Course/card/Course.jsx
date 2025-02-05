/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom"
import { AiFillLike } from "react-icons/ai"
import { FaShareAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import SweetAlertService from "../../../helper/sweetalertService"
import ServiceNilai from "../../../api/service/Nilai.service"
import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import SharePopup from "../../PopUp"

const CourseItem = ({dataCourse}) => {
  // console.log(dataCourse)
  const [statusLike, setStatusLike] = useState(dataCourse.MATERI)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [shareLink, setShareLink] = useState('')

  const togglePopup = (link) => {
    const fullLink = `${window.location.origin}${link}`
    setShareLink(fullLink)
    setIsPopupOpen(!isPopupOpen)
  }

  const Like = async (idMateri, LikeStatus) => {
    try {
      const token = localStorage.getItem('accessToken')
      const idUser = jwtDecode(token).IDUSER
      const data = {
        IDMateri: idMateri,
        LIKE: LikeStatus
      }
      await ServiceNilai.updateLike(idUser, data)
      const updatedMateri = statusLike.map((item) => {
        if (item.IDMATERI === idMateri) {
          const newJumlahLike = !LikeStatus ? item.DETAILS.JUMLAH_LIKE + 1 : item.DETAILS.JUMLAH_LIKE - 1
          return { 
            ...item, 
            LIKE: !LikeStatus,
            DETAILS: {
              ...item.DETAILS,
              JUMLAH_LIKE: newJumlahLike
            }
          }; // Toggle LIKE status
        }
        return item;
      });
      setStatusLike(updatedMateri)
      // return window.location.reload()
    } catch (error) {
      SweetAlertService.showError("Error !", error)
    }
  }
  return(
    <>
      <div className="w-full h-auto lg:h-auto bg-unguTua overflow-hidden py-3 px-3">
        <p className="text-2xl uppercase text-white font-bold border-b-4 border-kuning">{dataCourse.LEVEL} <span className="text-kuning">Python</span></p>
        <div className="h-5/6 mt-4 flex justify-center md:justify-center items-center flex-wrap gap-10 px-4">
        {
          statusLike.map((item, index) => {
            // console.log(item)
            return (
            <div key={index+1} className={`h-4/6 w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-abuAbu rounded-xl shadow-lg p-4`}>
              <div className="mt-6">
                <img className={`${item.STATUS == 1 ? "saturate-0" : "saturate-100"}`} src={item.DETAILS.IMAGES.replace("dl=0", "raw=1")} alt={item.DETAILS.NAMA_MATERI} />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-center mt-2">{item.DETAILS.NAMA_MATERI}</p>
                <div className="flex flex-row gap-3 justify-center mt-2 font-semibold text-sm">
                  {
                    item.LIKE === true 
                    ?
                    <button onClick={() => Like(item.IDMATERI, item.LIKE)} className="flex flex-row items-center gap-2 bg-red-600 hover:bg-red-300 px-2 py-2 rounded-md ease-in duration-200">
                      <AiFillLike className="text-xl text-white" />
                      {item.DETAILS.JUMLAH_LIKE}
                    </button>
                    :
                    <button onClick={() => Like(item.IDMATERI, item.LIKE)} className="flex flex-row items-center gap-2 bg-red-400 hover:bg-red-200 px-2 py-2 rounded-md ease-in duration-200">
                      <AiFillLike className="text-xl text-white" />
                      {item.DETAILS.JUMLAH_LIKE}
                      Like
                    </button>
                  }
                  <button 
                    onClick={() =>
                      togglePopup(`/course-page/video-page/${item.DETAILS.IDMATERI}`)
                    } 
                    className="flex flex-row items-center gap-2 bg-green-500 hover:bg-green-300 px-2 py-1 rounded-md ease-in duration-200">
                    <FaShareAlt className="text-xl text-white" />
                    Share
                  </button>
                </div>
                <div className="w-full flex justify-center items-center mt-5">
                  <Link disabled to={`/course-page/video-page/${item.DETAILS.IDMATERI}`} className={`font-semibold uppercase bg-unguMuda hover:bg-unguTua border-2 border-unguTua px-7 py-2 rounded-full text-white text-sm ${item.STATUS == 1 ? "saturate-0" : "saturate-100"}`}>
                    Start
                  </Link>
                </div>
              </div>
            </div>
          )})
        }
        </div>
        {isPopupOpen && (
          <SharePopup
            onClose={() => setIsPopupOpen(false)}
            link={shareLink}
            triggerText="Share This Course"
          />
        )}
      </div>
    </>
  )
}

export default CourseItem