import { useEffect, useState } from "react"
import Layout from "./Layout"
import ServiceNilai from "../../api/service/Nilai.service"
import { useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import '../../assets/css/nilaiPage.css'
import { IMAGES } from "../../assets"
import TableBundle from "../../components/Table/TableBundle"

const MyLearningpPofilePage = () => {
  const { idUser } = useParams()
  const [materi, setMateri] = useState([])

  const getKategori = async () => {
    try {
      const dataUser = await ServiceNilai.getNilai(idUser)
      console.log(dataUser)
      setMateri(dataUser.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const decode = jwtDecode(token)
    console.log(decode)
    getKategori()
  }, [])
  return (
    <>
      <Layout>
        <div className="p-5">
          <div className="w-full flex flex-col justify-between">
            <div className="mt-10 flex justify-start relative">
              <img src={IMAGES.gambar3} alt="lplus" className="logo-print hidden" />
              <p className="text-xl font-bold title-print">My Learning</p>
            </div>
          </div>
          <TableBundle dataNilai={materi}/>
        </div>
      </Layout>
    </>
  )
}

export default MyLearningpPofilePage