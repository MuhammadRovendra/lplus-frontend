import { useParams } from "react-router-dom"
import Footer1 from "../../components/Footer/index copy"
// import ContohCode from "../../components/Materi/ContohCode"
// import Soal from "../../components/Materi/Soal"
// import RingkasanMateri from "../../components/Materi/Ringkasan"
import VideoMateri from "../../components/Materi/Video"
import Navbar from "../../components/Navbar"
import Layout from "./Layout"


const VideoPage = () => {
  const {idMateri} = useParams()
  const {idBundle} = useParams()
  
  const handleNextPage = () => {
    window.location.href = `/course-page/ringkasan-page/${idBundle}/${idMateri}`
  }
  return(
    <Layout>
      <Navbar />
      <VideoMateri />
      <div className="w-full flex flex-col">
        <div className="w-full text-black font-bold py-3 text-end px-10 bg-black-2">
          <button className="px-8 py-2 rounded-xl bg-kuning" onClick={handleNextPage}>
            Next
          </button>
        </div>
        <Footer1 />
      </div>
    </Layout>
  )
}

export default VideoPage