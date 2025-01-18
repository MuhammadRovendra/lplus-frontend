import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { IMAGES } from "../../assets";
import ServiceUser from "../../api/service/User.service"
import SweetAlertService from "../../helper/sweetalertService";
// import SweetAlertService from "../../helper/sweetalertService"

// import { IMAGES } from "../../assets"

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      if(email === '' || password === ''){
        return SweetAlertService.showError('Gagal', 'Tolong lengkapi email dan password anda')
      }
      const data = {
        EMAIL: email,
        PASSWORD: password
      }
      const response = await ServiceUser.loginUser(data)
      console.log(response)
      if(response.status === true){
        localStorage.setItem('accessToken', response.data.accessToken)
        SweetAlertService.showSuccess('Success', 'Selamat datang')
        return navigate('/')
      }
      return SweetAlertService.showError('Error', response.message)
    } catch (error) {
      // console.log(error)
      SweetAlertService.showError('Error !!', error)
    }
  }
  return(
    <div className="flex justify-center items-center w-screen h-screen bg-cover" style={{ backgroundImage: `url(${IMAGES.bg2})`}}>
      <div className="bg-unguTua flex flex-col sm:flex-row shadow-lg rounded-xl">
        <div className="flex flex-col gap-4 px-10 bg-white rounded-lg min-h-full justify-center">
          <h2 className="text-2xl font-bold">Login</h2>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs">Enter your email address</p>
            <input 
              type="text"
              placeholder="ex. xxxxx@gmail.com"
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
          <div>
            <button className="bg-unguMuda w-full text-white py-1 rounded-2xl mt-1" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div>
            <p className="text-xs text-center">Don’t have an account? <a className="text-unguMuda hover:text-unguTua" href="/sign-up-page">Register</a></p>
          </div>
        </div>
          <img 
            src={IMAGES.gambar2} 
            style={{ height: '400px' }}
            alt="Illustrasi" 
          />
      </div>
    </div>
  )
}

export default LoginForm