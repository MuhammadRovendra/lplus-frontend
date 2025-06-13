import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ServiceMateri from "../../api/service/Materi.service"

const VideoMateri = () => {
  const {idMateri} = useParams()
  const [videoId, setVideoId] = useState('')
  // console.log(idMateri)

  const getMateri = async () => {
    try {
      const dataMateri = await ServiceMateri.getMateriById(idMateri)
      const videoUrl = dataMateri.data.VIDEO
      const videoID = videoUrl.match(/v=([^&]*)/)[1];
      setVideoId(videoID)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMateri()
  }, [])
  return (
    <div className="flex justify-center">
      <iframe
        width="720"
        height="510"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="mt-14"
      ></iframe>
    </div>
  )
}

export default VideoMateri