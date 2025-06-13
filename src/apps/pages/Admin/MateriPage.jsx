import { useEffect, useState } from "react"
import Layout from "./Layout"
import '../../assets/css/nilaiPage.css'
import ServiceMateri from "../../api/service/Materi.service"
import TabelMateri from "../../components/Table/TableMateri"
import { useNavigate } from "react-router-dom"

const MateriPage = () => {
  const navigate = useNavigate()
  const [materi, setMateri] = useState([])

  const getMateri = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const data = await ServiceMateri.getAll(token)
      console.log(data)
      setMateri(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigate = () => {
    return navigate('/Admin/materi-page/add-materi')
  }
  
  useEffect(() => {
    getMateri()
  }, [])
  return (
    <>
      <Layout>
        <div className="p-5">
          <div className="w-full flex flex-col justify-between">
            <div className="mt-10 flex justify-between items-center relative">
              <p className="text-xl font-bold">Materi List</p>
              <button onClick={handleNavigate} className="bg-unguMuda hover:bg-purple-300 px-3 py-2 rounded-md text-white">
                Add Materi
              </button>
            </div>
          </div>
          <TabelMateri dataNilai={materi}/>
        </div>
      </Layout>
    </>
  )
}

export default MateriPage