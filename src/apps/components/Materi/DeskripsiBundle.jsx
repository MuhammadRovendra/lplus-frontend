import RatingDisplay from "../Rating"
import { BiUser } from "react-icons/bi"
import { useParams } from "react-router-dom"
import ServiceKategori from "../../api/service/Kategori.service"
import { useEffect, useState } from "react"

const DeskripsiBundle = () =>{
  const {idBundle} = useParams()
  const [kategori, setKategori] = useState([])

  const getKategori = async () => {
      try {
        const dataBundle = await ServiceKategori.getByID(idBundle);
        // console.log(dataBundle)
        setKategori(dataBundle.data[0]);
      } catch (error) {
        console.log('Error getting kategori:', error);
      }
    };

    useEffect(() => {
      getKategori()
    }, [])
  return (
    <div className="w-full h-screen flex flex-col px-8 py-24 bg-unguTua text-white">
      <p className="text-3xl font-semibold mb-4">Python: {kategori.KATEGORI} </p>
      <hr />
      <div className="mt-4 px-4 mb-4">
        <p className="text-lg font-semibold">Deskripsi</p>
        <p className="mt-2">{kategori.DESKRIPSI}</p>
      </div>
      <hr className="w-1/4" />
      <div className="mt-4 px-1 flex flex-row gap-10">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm font-semibold">Rating {kategori.RATING}</p>
          <RatingDisplay rating={kategori.RATING} max={5} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Students</p>
          <div className="flex flex-row items-center gap-2">
            <BiUser className="text-xl" />
            <span>{kategori.STUDENTS}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeskripsiBundle