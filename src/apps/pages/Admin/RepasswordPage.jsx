import { useState } from "react"
import Layout from "./Layout"
import ServiceUser from "../../api/service/User.service"
import SweetAlertService from "../../helper/sweetalertService"
import { jwtDecode } from "jwt-decode"

const RepasswordAdminPage = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const handleRepassword = async () => {
    try {
      const data = {
        OLD_PASSWORD: oldPassword,
        NEW_PASSWORD: newPassword,
        CONF_PASSWORD: confPassword
      }
      const token = localStorage.getItem('accessToken')
      const idUser = jwtDecode(token).IDUSER
      const response = await ServiceUser.repassword(idUser, data,token)
      console.log(response)
      if(response.status === false){
        return SweetAlertService.showError("Error", response.message )
      }
      SweetAlertService.showSuccess("Success", response.message )
      return window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      <Layout>
        <h1 className="text-xl font-bold mt-12 md:mt-10">Change Password</h1>
        <div className="flex flex-col gap-4 py-5 bg-white rounded-lg min-h-full justify-center items-center">
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs font-bold">Enter your old password</p>
            <input 
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="bg-white border w-full border-blue-700 rounded px-2 py-1"
            />
            <p className="text-xs font-bold">Enter your new password</p>
            <input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-white border w-full border-blue-700 rounded px-2 py-1"
            />
            <p className="text-xs font-bold">Enter your confirm new password</p>
            <input 
              type="password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              className="bg-white border w-full border-blue-700 rounded px-2 py-1"
            />
            <div>
              <button className="bg-unguMuda w-full text-white py-1 mt-1 px-2 rounded" onClick={handleRepassword}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default RepasswordAdminPage