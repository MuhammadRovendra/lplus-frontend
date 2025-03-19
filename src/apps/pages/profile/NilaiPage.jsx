import { useEffect, useRef, useState } from "react"
import TableNilai from "../../components/Table/TableNilai"
import Layout from "./Layout"
import ServiceNilai from "../../api/service/Nilai.service"
import { useParams } from "react-router-dom"
import { useReactToPrint } from 'react-to-print'
import { jwtDecode } from "jwt-decode"
import '../../assets/css/nilaiPage.css'
import { IMAGES } from "../../assets"

const NilaiPage = () => {
  const { idUser } = useParams()
  const [materi, setMateri] = useState([])
  const [nilai, setNilai] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tanggalCetak, setTanggalCetak] = useState('');

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

  const handlePrint = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
    setTanggalCetak(formattedDate);
    
    setTimeout(() => {
      reactToPrintFn();
    }, 100); // Tunggu sebentar agar state ter-update sebelum cetak
  };
  
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
          <div className="w-full flex flex-col justify-between">
            <div className="mt-10 flex justify-center items-center relative">
              <img src={IMAGES.gambar3} alt="lplus" className="logo-print hidden" />
              <p className="text-xl font-bold title-print">Transkip Nilai</p>
            </div>
            <div className="w-full flex flex-row justify-between mt-5">
              <div className="text-sm ms-1 my-2">
                <p>ID: {idUser}</p>
                <p>Nama: {name}</p>
                <p>Email: {email}</p>
                <p>Nilai Total: {nilai.toFixed(2)}</p>
              </div>
            <button type="button" onClick={handlePrint} className="bg-green-500 btn-print hover:bg-green-600 px-2 py-2 text-white h-fit font-bold rounded">
              Print
            </button>
            </div>
          </div>
          <TableNilai dataNilai={materi}/>
          <div className="w-full bg-white flex flex-row items-center py-3 justify-between px-3 mt-5 rounded shadow-default">
            <p>Total Nilai:</p>
            <p>{nilai.toFixed(2)}</p>
          </div>
          <p className="hidden tanggal-cetak">Tanggal Cetak: {tanggalCetak}</p>
        </div>
      </Layout>
    </>
  )
}

export default NilaiPage