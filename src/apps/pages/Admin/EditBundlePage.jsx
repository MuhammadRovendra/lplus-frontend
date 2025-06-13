import { useEffect, useState } from "react"
import Layout from "./Layout"
import SweetAlertService from "../../helper/sweetalertService"
import imageCompression from 'browser-image-compression'
import ServiceKategori from "../../api/service/Kategori.service"
import { useParams } from "react-router-dom"

const EditBundlePage = () => {
  const {idBundle} = useParams()
  const [kategori, setKategori] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null) // 👉 untuk menampilkan gambar

  const getBundleById = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await ServiceKategori.getByID(idBundle, token)
      console.log(response)
      if (response.status === false) {
        return SweetAlertService.showError("Error", response.message)
      }
      // SweetAlertService.showSuccess("Success", response.message)
      setKategori(response.data[0].KATEGORI)
      setDeskripsi(response.data[0].DESKRIPSI)
    } catch (error) {
      return SweetAlertService.showError("Error", error.message || "Unknown error")
    }
  }

  const handleFileChange = async (e) => {
    // console.log("Event: ", e); // Cek apakah event berhasil ditrigger
    const selectedFile = e.target.files?.[0] || null;
    if(selectedFile){
      const option = {
        maxSizeMB: 1, 
        initialQuality: 0.8,
        useWebWorker: true
      }
      try {
        const compressFile = await imageCompression(selectedFile, option)
        setImage(compressFile)
        setImagePreview(URL.createObjectURL(compressFile))
        // console.log(selectedFile.size)
        // console.log(compressFile.size)
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleAddBundle = async () => {
    try {
      const formData = new FormData()

      formData.append("KATEGORI", kategori)
      formData.append("DESKRIPSI", deskripsi)

      if(image){
        formData.append('IMAGE', image)
      }

      const token = localStorage.getItem('accessToken')

      const response = await ServiceKategori.addKategori(formData, token)
      if (response.status === false) {
        return SweetAlertService.showError("Error", response.message)
      }
      SweetAlertService.showSuccess("Success", response.message)
      // return window.location.reload()
    } catch (error) {
      return SweetAlertService.showError("Error", error.message || "Unknown error")
    }
  }

  useEffect(() => {
    getBundleById()
  }, [])
  return (
    <>
      <Layout>
        <h1 className="text-xl font-bold mt-12 md:mt-12">Edit Bundle</h1>
        <div className="flex flex-row gap-6 p-10 mt-2 bg-white rounded-lg min-h-full justify-center items-center">
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs font-bold">Bundle Name</p>
            <input 
              type="text"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="bg-white border w-full border-blue-700 rounded px-2 py-1"
            />

            <p className="text-xs font-bold">Image</p>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} // 👉 handle perubahan file
            />

            <p className="text-xs font-bold">Description</p>
            <textarea 
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="bg-white border w-full border-blue-700 rounded px-2 py-1"
            />

            <button 
              className="bg-unguMuda w-full text-white py-1 mt-1 px-2 rounded" 
              onClick={handleAddBundle}
            >
              Confirm
            </button>
          </div>

          {/* Tampilkan preview jika gambar sudah dipilih */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-xs font-bold text-center">Preview Image:</p>
              <img src={imagePreview} alt="Preview" className="max-w-xs max-h-60 rounder" />
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default EditBundlePage
