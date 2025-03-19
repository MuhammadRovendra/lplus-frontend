import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ServiceUser from "../../api/service/User.service"
// import SweetAlertService from "../../helper/sweetalertService"
// import { IMAGES } from "../../assets"

import { IMAGES } from "../../assets"
import SweetAlertService from "../../helper/sweetalertService"

const SignUpForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const handleRegister = async () => {
    try {
      if(name === '' || email === '' || password === '' || confPassword === ''){
        return SweetAlertService.showError('Gagal', 'Tolong lengkapi data registrasi anda')
      }
      const data = {
        NAME: name,
        EMAIL: email,
        PASSWORD: password,
        CONFPASSWORD: confPassword
      }
      // const token = localStorage.getItem('token')
      const response = await ServiceUser.addUser(data)
      // console.log(response)
      if(response.status === false){
        return SweetAlertService.showError("Error", response.message )
      }
      SweetAlertService.showSuccess("Success", response.message )
      return navigate('/login-page')
    } catch (error) {
      // console.log(error)
      SweetAlertService.showError("Error !", error.response.data.message)
    }
  }

  return(
    <div className="flex justify-center items-center w-screen h-screen" style={{ backgroundImage: `url(${IMAGES.bg2})`}}>
      <div className="bg-unguTua flex flex-col sm:flex-row shadow-lg rounded-xl">
        <div className="flex flex-col gap-4 px-10 py-8 bg-white rounded-lg min-h-full justify-center">
          <h2 className="text-2xl font-bold">Register</h2>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs">Enter your name</p>
            <input 
              type="text"
              placeholder="type your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border border-blue-700 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs">Enter your email address</p>
            <input 
              type="text"
              placeholder="type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-blue-700 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs">Enter your password</p>
            <input 
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border border-blue-700 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs">Confirm your password</p>
            <input 
              type="password"
              placeholder="confirm password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              className="bg-white border border-blue-700 rounded px-2 py-1"
            />
          </div>
          <div>
            <button className="bg-unguMuda w-full text-white py-1 rounded-2xl mt-1" onClick={handleRegister}>
              Register
            </button>
          </div>
          <div>
            <p className="text-xs text-center">Do you have an account? <a className="text-unguMuda hover:text-unguTua" href="/login-page">Login</a></p>
          </div>
        </div>
          <img 
            src={IMAGES.gambar2} 
            style={{ height: '400px' }}
            alt="Illustrasi" 
            className="hidden md:flex"
          />
      </div>
    </div>
  )
}

export default SignUpForm