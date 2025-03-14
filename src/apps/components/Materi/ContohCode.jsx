
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ServiceMateri from "../../api/service/Materi.service";

const ContohCode = () => {
  const {idMateri} = useParams()
  const [teks, setTeks] = useState('')
  const url = 'https://www.programiz.com/python-programming/online-compiler/'

  const getMateri = async () => {
    try {
      const dataMateri = await ServiceMateri.getMateriById(idMateri)
      const contohSoal = dataMateri.data.CONTOH
      // console.log(contohSoal)
      setTeks(contohSoal)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(teks).then(() => {
      setTeks('Copied to clipboard')
      window.open(url, '_blank')
      setTimeout(() => {
        setTeks(teks);
      }, 3000);
      }).catch(err => {
        console.error('Could not copy text: ', err)
        });
  }
  useEffect(() => {
    getMateri()
  }, [])
  return (
    <div className="w-full h-full bg-red-50 py-20 px-5 sm:px-20">
      <p className="text-3xl font-bold text-black">CONTOH <span className="text-unguMuda">CODE</span></p>
      <div className="w-auto h-fit mx-auto flex flex-col">
        <div className="bg-abuAbu px-6 sm:px-10 max-w-200 py-6 mt-18 flex flex-col gap-3 rounded-xl">
          <p className="text-blue-gray-8 font-bold text-start">Example</p>
          <div className="bg-gray-2 max-w-200 p-5 rounded-md">
          {teks.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          {/* <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            className="p-6 w-auto"
            /> */}
        </div>
          <button className="bg-unguTua text-white px-4 py-2 rounded-2xl mt-3 ms-auto" onClick={handleCopy}>
            Copy dan Test Code
          </button>
      </div>
    </div>
  )
}

export default ContohCode