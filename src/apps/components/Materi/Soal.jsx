
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ServiceMateri from "../../api/service/Materi.service"
import ServiceNilai from "../../api/service/Nilai.service"
import { jwtDecode } from "jwt-decode"
import SweetAlertService from "../../helper/sweetalertService"

const Soal = () => {
  const {idMateri} = useParams()
  const [teks, setTeks] = useState('')
  const [jawaban, setJawaban] = useState('')
  const [inputJawaban, setInputJawaban] = useState('')

  const getMateri = async () => {
    try {
      const dataMateri = await ServiceMateri.getMateriById(idMateri)
      const contohSoal = dataMateri.data.SOAL
      const jwb = dataMateri.data.JAWABAN
      // console.log(contohSoal)
      setTeks(contohSoal)
      setJawaban(jwb)
    } catch (error) {
      console.log(error)
    }
  }
  
  const updateNilai = async () => {
    try {
      const data = {
        data: "done",
        IDMateri: idMateri
      }

      const token = localStorage.getItem('accessToken')
      const decodeToken = jwtDecode(token)

      const dataMateri = await ServiceNilai.updateNilai(decodeToken.IDUSER, data)
      console.log(dataMateri)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputJawaban = () => {
    try {
      if(inputJawaban !== jawaban){
        return SweetAlertService.showError("Jawaban Anda salah !", "Silahkan mengisi jawaban dengan benar")
      }
      // alert('Jawaban anda benar !, Selamat')
      SweetAlertService.showSuccess("Jawaban anda benar !", "Selamat jawaban anda benar, Silahkan klik tombol finish untuk kembali ke halaman utama")
      updateNilai()
    } catch (error) {
      console.log(error)
    }
  }

  const renderTextWithInput = (text) => {
    const parts = text.split('?')
    return parts.map((part, index) => (
      index < parts.length - 1 ? (
        <span key={index}>
          {part}
          <input value={inputJawaban} onChange={(e) => setInputJawaban(e.target.value)} type="text" className=" px-1 w-20 rounded-sm" placeholder="" />
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    ))
  }

  useEffect(() => {
    getMateri()
  }, [])
  return (
    <div className="w-full h-full bg-red-50 py-20 px-20">
      <p className="text-3xl font-bold text-black">LATI<span className="text-unguMuda">HAN</span></p>
      <div className="w-fit h-fit mx-auto flex flex-col">
        <div className=" px-10 py-6 mt-18 flex flex-col gap-3 rounded-xl">
          <p className="text-blue-gray-8 font-bold text-start">Silahkan kerjakan Soal dibawah ini !</p>
          <div className="bg-abuAbu max-w-200 p-5 rounded-md">
          {teks.split("\n").map((line, index) => (
              <p key={index}>{renderTextWithInput(line)}</p>
            ))}
          </div>
        </div>
          <button className="bg-unguTua text-white px-4 py-2 rounded-2xl mt-3 ms-auto" onClick={handleInputJawaban}>
            Submit
          </button>
      </div>
    </div>
  )
}

export default Soal