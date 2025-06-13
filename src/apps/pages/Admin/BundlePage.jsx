import { useEffect, useState } from "react"
import Layout from "./Layout"
import { jwtDecode } from "jwt-decode"
import '../../assets/css/nilaiPage.css'
import ServiceKategori from "../../api/service/Kategori.service"
import TableBundleAdmin from "../../components/Table/TableBundleAdmin"
import { useNavigate } from "react-router-dom"

const BundlePage = () => {
  const navigate = useNavigate()
  const [materi, setMateri] = useState([])

  const getKategori = async () => {
    try {
      const dataUser = await ServiceKategori.getKategori()
      console.log(dataUser)
      setMateri(dataUser.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigate = () => {
    return navigate('/Admin/bundle-page/add-bundle')
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
            <div className="mt-10 flex justify-between items-center relative">
              <p className="text-xl font-bold">Bundle List</p>
              <button onClick={handleNavigate} className="bg-unguMuda hover:bg-purple-300 px-3 py-2 rounded-md text-white">
                Add Bundle
              </button>
            </div>
          </div>
          <TableBundleAdmin dataNilai={materi}/>
        </div>
      </Layout>
    </>
  )
}

export default BundlePage