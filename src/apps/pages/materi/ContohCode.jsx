import { useParams } from "react-router-dom"
import Footer1 from "../../components/Footer/index copy"
import ContohCode from "../../components/Materi/ContohCode"
// import Soal from "../../components/Materi/Soal"
// import RingkasanMateri from "../../components/Materi/Ringkasan"
// import VideoMateri from "../../components/Materi/Video"
import Navbar from "../../components/Navbar"


const ContohCodePage = () => {
  const {idMateri} = useParams()
  
  const handleNextPage = () => {
    window.location.href = `/course-page/soal-page/${idMateri}`
  }
  const handlePreviousPage = () => {
    window.location.href = `/course-page/ringkasan-page/${idMateri}`
  }
  return(
    <div className="w-full h-screen flex flex-col justify-between bg-blue-gray-900">
      <Navbar />
      <ContohCode />
      <div>
        <div className="w-full text-black font-bold py-3 flex justify-between px-10 bg-black-2">
          <button className="px-8 py-2 rounded-xl bg-kuning" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="px-8 py-2 rounded-xl bg-kuning" onClick={handleNextPage}>
            Next
          </button>
        </div>
        <Footer1 />
      </div>
    </div>
  )
}

export default ContohCodePage