import { useState } from "react"
import Layout from "./Layout"
import ServiceUser from "../../api/service/User.service"
import SweetAlertService from "../../helper/sweetalertService"
import { jwtDecode } from "jwt-decode"

const RenameAdminPage = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleRename = async () => {
    try {
      const data = {
        NAME: name,
        PASSWORD: password
      }
      const token = localStorage.getItem('accessToken')
      const idUser = jwtDecode(token).IDUSER
      const response = await ServiceUser.rename(idUser, data,token)
      if(response.status === false){
        return SweetAlertService.showError("Error", response.message )
      }
      SweetAlertService.showSuccess("Success", response.message )
      return window.location.reload()
    } catch (error) {
      return SweetAlertService.showSuccess("Success", error )
    }
  }

  return (
    <>
      <Layout>
        <h1 className="text-xl font-bold mt-12 md:mt-10">Rename</h1>
        <div className="flex flex-col gap-4 p-10 bg-white rounded-lg min-h-full justify-center items-center">
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs font-bold">Enter your new name</p>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border w-full border-blue-700 rounded px-2 py-1"
            />
            <p className="text-xs font-bold">Enter your password for confirm</p>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border w-full border-blue-700 rounded px-2 py-1"
            />
            <div>
              <button className="bg-unguMuda w-full text-white py-1 mt-1 px-2 rounded" onClick={handleRename}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default RenameAdminPage