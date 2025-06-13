import { useParams } from "react-router-dom"
import Footer1 from "../../components/Footer/index copy"
import Soal from "../../components/Materi/Soal"
import Navbar from "../../components/Navbar/index"
import SweetAlertService from "../../helper/sweetalertService"
import ServiceNilai from "../../api/service/Nilai.service"
import { jwtDecode } from "jwt-decode"
import Layout from "./Layout"

const SoalPage = () => {
  const { idBundle, idMateri } = useParams()

  const Like = async (LikeStatus) => {
    try {
      const token = localStorage.getItem('accessToken')
      const idUser = jwtDecode(token).IDUSER
      const data = {
        IDMateri: idMateri,
        LIKE: LikeStatus
      }
      await ServiceNilai.updateLike(idUser, data)
      return SweetAlertService.showSuccess('Berhasil Like', "berhasil")
    } catch (error) {
      SweetAlertService.showError("Error !", error)
    }
  }

  const handleNextPage = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const idUser = jwtDecode(token).IDUSER

      const cekLike = await ServiceNilai.getNilaiByUserByKategori(idUser, idBundle)
      // console.log(cekLike)
      const nilaiUser = cekLike.data[0]
      const dataMateri = nilaiUser.MATERI

      const currentIndex = dataMateri.findIndex(item => item.IDMATERI === idMateri)
      const findMateri = dataMateri[currentIndex]

      // Step 1: Like
      if (!findMateri.LIKE) {
        const likeConfirm = await SweetAlertService.confirmLike()
        if (likeConfirm.isConfirmed) {
          await Like(findMateri.LIKE)
        }
      }

      // Step 2: Pilih menu
      const menuChoice = await SweetAlertService.ChooseMenu()

      // Step 3: Jika pilih kembali ke deskripsi
      if (menuChoice.isConfirmed) {
        const alreadyRated = nilaiUser.RATING > 0
        // console.log(alreadyRated)

        if (!alreadyRated) {
          const ratingPrompt = await SweetAlertService.askRating()

          if (ratingPrompt.isConfirmed) {
            const rating = parseFloat(ratingPrompt.value)
            const data = {
              IDKATEGORI: idBundle,
              RATING: rating
            }
            await ServiceNilai.updateRatingBundle(idUser, data)
            await SweetAlertService.showSuccess("Terima kasih!", "Rating berhasil disimpan")
          }
          // ✅ Setelah isi rating **atau batal isi rating**, tetap ke deskripsi
        }

        // ✅ Kalau sudah kasih rating, atau setelah prompt (isi/batal) → ke deskripsi
        return window.location.href = `/course-page/deskripsi-bundle-page/${idBundle}`
      }

      // Step 4: Jika pilih lanjut
      const nextMateri = dataMateri[currentIndex + 1]?.IDMATERI
      if (nextMateri) {
        return window.location.href = `/course-page/video-page/${idBundle}/${nextMateri}`
      }

    } catch (error) {
      SweetAlertService.showError("Terjadi kesalahan", error)
    }
  }

  const handlePreviousPage = () => {
    window.location.href = `/course-page/contoh-code-page/${idBundle}/${idMateri}`
  }

  return (
    <Layout>
      <Navbar />
      <Soal />
      <div className="w-full flex flex-col">
        <div className="w-full text-black font-bold py-3 flex justify-between px-10 bg-black-2">
          <button className="px-8 py-2 rounded-xl bg-kuning" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="px-8 py-2 rounded-xl bg-kuning" onClick={handleNextPage}>
            Finish
          </button>
        </div>
        <Footer1 />
      </div>
    </Layout>
  )
}

export default SoalPage
