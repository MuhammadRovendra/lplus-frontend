import { useEffect, useState } from "react"
import Layout from "./Layout"
import SweetAlertService from "../../helper/sweetalertService"
import imageCompression from 'browser-image-compression'
import ServiceKategori from "../../api/service/Kategori.service"
import ServiceMateri from "../../api/service/Materi.service"

const AddMateriPage = () => {
  const [kategori, setKategori] = useState('')
  const [materiName, setMateriName] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [video, setVideo] = useState('')
  const [contohCode, setContohCode] = useState('')
  const [soal, setSoal] = useState('')
  const [jawaban, setJawaban] = useState('')
  const [jumlahLike, setJumlahLike] = useState(0)
  const [bundle, setBundle] = useState([])
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0] || null
    if (selectedFile) {
      const option = {
        maxSizeMB: 1,
        initialQuality: 0.8,
        useWebWorker: true
      }
      try {
        const compressFile = await imageCompression(selectedFile, option)
        setImage(compressFile)
        setImagePreview(URL.createObjectURL(compressFile))
      } catch (error) {
        console.error('Error compressing image:', error)
      }
    }
  }

  const handleAddMateri = async () => {
    if (!materiName.trim() || !kategori || !deskripsi.trim() || !video.trim() || !soal.trim() || !jawaban.trim()) {
      return SweetAlertService.showError("Error", "Semua kolom wajib diisi, kecuali gambar dan contoh kode.");
    }
    try {
      const formData = new FormData()
      formData.append("KATEGORI", kategori)
      formData.append("NAMA_MATERI", materiName)
      formData.append("MATERI", deskripsi)
      formData.append("VIDEO", video)
      formData.append("CONTOH", contohCode)
      formData.append("SOAL", soal)
      formData.append("JAWABAN", jawaban)
      formData.append("JUMLAH_LIKE", jumlahLike)

      if (image) {
        formData.append('IMAGE', image)
      }

      const token = localStorage.getItem('accessToken')
      const response = await ServiceMateri.addMateri(formData, token)

      if (response.status === false) {
        return SweetAlertService.showError("Error", response.message)
      }

      SweetAlertService.showSuccess("Success", response.message)
    } catch (error) {
      return SweetAlertService.showError("Error", error.message || "Unknown error")
    }
  }

  const getKategori = async () => {
  try {
    const dataUser = await ServiceKategori.getKategori()
    const filteredData = dataUser.data.filter((item) => item.STATUS === 0)
    setBundle(filteredData)
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    getKategori()
  }, [])

  return (
    <Layout>
      <h1 className="text-xl font-bold mt-12 md:mt-12">Add Materi</h1>
      <div className="flex flex-row gap-6 p-10 mt-2 bg-white rounded-lg">
        <div className="flex flex-col gap-3 text-sm w-full md:w-1/2">
          <label className="text-xs font-bold">Materi Name</label>
          <input
            type="text"
            value={materiName}
            onChange={(e) => setMateriName(e.target.value)}
            placeholder="Masukkan nama materi"
            className="bg-white border border-blue-700 rounded px-2 py-1"
          />

          <label className="text-xs font-bold">Bundle</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="bg-white border border-blue-700 rounded px-2 py-1"
          >
            <option value="">-- Pilih Bundle --</option>
            {bundle.map((item) => (
              <option key={item.IDKATEGORI} value={item.IDKATEGORI}>
                {item.KATEGORI}
              </option>
            ))}
          </select>

          <label className="text-xs font-bold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <label className="text-xs font-bold">Video</label>
          <input
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            placeholder="Link video atau deskripsi"
            className="bg-white border border-blue-700 rounded px-2 py-1"
          />

          <label className="text-xs font-bold">Materi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Isi materi"
            className="bg-white border border-blue-700 rounded px-2 py-1"
          />

          <label className="text-xs font-bold">Contoh Code</label>
          <textarea
            value={contohCode}
            onChange={(e) => setContohCode(e.target.value)}
            placeholder="Masukkan contoh kode"
            className="bg-white border border-blue-700 rounded px-2 py-1"
          />

          <label className="text-xs font-bold">Soal</label>
          <textarea
            value={soal}
            onChange={(e) => setSoal(e.target.value)}
            placeholder="Masukkan soal"
            className="bg-white border border-blue-700 rounded px-2 py-1"
          />

          <label className="text-xs font-bold">Jawaban</label>
          <input
            type="text"
            value={jawaban}
            onChange={(e) => setJawaban(e.target.value)}
            placeholder="Jawaban dari soal"
            className="bg-white border border-blue-700 rounded px-2 py-1"
          />

          <button
            className="bg-unguMuda w-full text-white py-2 mt-3 px-2 rounded font-semibold"
            onClick={handleAddMateri}
          >
            Simpan Materi
          </button>
        </div>

        {imagePreview && (
          <div className="flex justify-center items-start w-full md:w-1/2 mt-6 md:mt-0">
            <div>
              <p className="text-xs font-bold text-center mb-2">Preview Image</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs max-h-60 rounded shadow"
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AddMateriPage
