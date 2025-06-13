import { useEffect, useState } from "react"
// import ServiceKategori from "../../api/service/Kategori.service"
import { IMAGES } from "../../assets"
// import ServiceNilai from "../../api/service/Nilai.service"
import ServiceKategori from "../../api/service/Kategori.service"
import SharePopup from "../PopUp"
import { FaShareAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
// import { jwtDecode } from "jwt-decode"

const CourseComponent = () => {
  const [kategori, setKategori] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [shareLink, setShareLink] = useState('')

  const getKategori = async () => {
    try {
      // const token = localStorage.getItem('accessToken')
      // const decode = jwtDecode(token)
      // const id = decode.IDUSER
      const dataBundle = await ServiceKategori.getKategori()
      const filteredData = dataBundle.data.filter((item) => item.STATUS === 1)
      console.log(filteredData)
      setKategori(filteredData)
    } catch (error) {
      console.log(error)
    }
  }

  const togglePopup = (link) => {
    const fullLink = `${window.location.origin}${link}`
    setShareLink(fullLink)
    setIsPopupOpen(!isPopupOpen)
  }

  // const Like = async (idMateri, LikeStatus) => {
  //   try {
  //     const token = localStorage.getItem('accessToken')
  //     const idUser = jwtDecode(token).IDUSER
  //     const data = {
  //       IDMateri: idMateri,
  //       LIKE: LikeStatus
  //     }
  //     await ServiceNilai.updateLike(idUser, data)
  //     const updatedMateri = statusLike.map((item) => {
  //       if (item.IDMATERI === idMateri) {
  //         const newJumlahLike = !LikeStatus ? item.DETAILS.JUMLAH_LIKE + 1 : item.DETAILS.JUMLAH_LIKE - 1
  //         return { 
  //           ...item, 
  //           LIKE: !LikeStatus,
  //           DETAILS: {
  //             ...item.DETAILS,
  //             JUMLAH_LIKE: newJumlahLike
  //           }
  //         }; // Toggle LIKE status
  //       }
  //       return item;
  //     });
  //     setStatusLike(updatedMateri)
  //     // return window.location.reload()
  //   } catch (error) {
  //     SweetAlertService.showError("Error !", error)
  //   }
  // }
  
  useEffect(() => {
    getKategori()
  }, [])
  return(
    <>
      <div className="">
        <div className="bg-abuAbu h-screen">
          <div className="h-full flex flex-col-reverse md:flex-row justify-center items-center px-5 text-justify md:px-44 py-5 md:py-2">
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
      <div className="w-full h-auto lg:h-auto bg-unguTua overflow-hidden py-3 px-3">
        <p className="text-2xl uppercase text-white font-bold border-b-4 border-kuning">ALl Course <span className="text-kuning">Python</span></p>
        <div className="h-5/6 mt-4 flex justify-center md:justify-start items-center flex-wrap gap-10 px-4">
        {
          kategori.map((item, index) => {
            // console.log(item)
            return (
            <div key={index+1} className={`h-4/6 w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-abuAbu rounded-xl shadow-lg p-4`}>
              <div className="mt-6">
                <img className={`${item.STATUS == 1 ? "saturate-100" : "saturate-100"}`} src={item.IMAGE.replace("dl=0", "raw=1")} alt={item.KATEGORI} />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-center mt-2">{item.KATEGORI}</p>
                <div className="flex flex-row gap-3 justify-center mt-2 font-semibold text-sm">
                  {/* {
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
                  } */}
                  <button 
                    onClick={() =>
                      togglePopup(`/course-page/video-page/${item.IDKATEGORI}`)
                    }
                    className="flex flex-row items-center gap-2 bg-green-500 hover:bg-green-300 px-2 py-1 rounded-md ease-in duration-200">
                    <FaShareAlt className="text-xl text-white" />
                    Share
                  </button>
                </div>
                <div className="w-full flex justify-center items-center mt-5">
                  <Link disabled to={`/course-page/deskripsi-bundle-page/${item.IDKATEGORI}`} className={`font-semibold uppercase bg-unguMuda hover:bg-unguTua border-2 border-unguTua px-7 py-2 rounded-full text-white text-sm ${item.STATUS == 1 ? "saturate-100" : "saturate-100"}`}>
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

export default CourseComponent