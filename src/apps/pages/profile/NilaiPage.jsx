import { useEffect, useRef, useState } from "react"
import TableNilai from "../../components/Table/TableNilai"
import Layout from "./Layout"
import ServiceNilai from "../../api/service/Nilai.service"
import { useParams } from "react-router-dom"
import { useReactToPrint } from 'react-to-print'
import { jwtDecode } from "jwt-decode"

const NilaiPage = () => {
  const { idUser } = useParams()
  const [materi, setMateri] = useState([])
  const [nilai, setNilai] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const contentRef = useRef()
  const reactToPrintFn = useReactToPrint({ contentRef });

  const getKategori = async () => {
    try {
      const dataUser = await ServiceNilai.getNilai(idUser)
      setNilai(dataUser.data[0].NILAI)
      setMateri(dataUser.data[0].PROGRES[0].MATERI)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const decode = jwtDecode(token)
    setName(decode.NAME)
    setEmail(decode.EMAIL)
    console.log(decode)
    getKategori()
  }, [])
  return (
    <>
      <Layout>
        <div className="p-5" ref={contentRef}>
          <div className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <p className="text-xl font-bold">Transkip Nilai</p>
              <div className="text-sm ms-1 my-2">
                <p>ID: {idUser}</p>
                <p>Nama: {name}</p>
                <p>Email: {email}</p>
                <p>Nilai Total: {nilai.toFixed(2)}</p>
              </div>
            </div>
            <button type="button" onClick={() => reactToPrintFn()} className="bg-green-500 hover:bg-green-600 px-2 py-2 text-white font-bold rounded">
              Print
            </button>
          </div>
          <TableNilai dataNilai={materi}/>
          <div className="w-full bg-white flex flex-row items-center py-3 justify-between px-3 mt-5 rounded shadow-default">
            <p>Total Nilai:</p>
            <p>{nilai}</p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default NilaiPage