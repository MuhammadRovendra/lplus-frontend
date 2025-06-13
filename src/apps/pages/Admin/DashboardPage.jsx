import { useEffect } from "react"  
import Layout from "./Layout"
import { jwtDecode } from "jwt-decode"
import '../../assets/css/nilaiPage.css'
import { MdDashboard } from "react-icons/md"

const DashboardPage = () => {
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const decode = jwtDecode(token)
    console.log(decode)
  }, [])
  return (
    <>
      <Layout>
        <div className="pt-18">
          <div className="bg-blue-gray-100 px-5 py-4 rounded-md flex flex-row items-center gap-2">
            <MdDashboard className="text-xl" />
            <p className="text-base font-semibold">Dashboard Admin</p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default DashboardPage