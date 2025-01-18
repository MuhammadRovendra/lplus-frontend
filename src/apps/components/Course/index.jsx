import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets"

const Course = () => {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    path = '/course-page'
    const token = localStorage.getItem('accessToken');
    if (!token && path === '/course-page') {
      alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
      navigate('/login-page');
      window.location.reload()
      return;
    }
    navigate(path);
    window.location.reload()
  };
  return(
    <div className="w-full h-auto lg:h-screen bg-abuAbu overflow-hidden ">
      <div className=" h-full flex flex-col-reverse lg:flex-row flex-wrap lg:flex-nowrap justify-center items-center px-5 lg:px-40 py-10">
        <div className="text-black flex flex-col flex-wrap gap-2">
          <p className="text-3xl font-extrabold uppercase mx-auto mb-3">Course <span className="text-purple-900 sha">LPLUS</span></p>
          <p>Mari bergabung dengan ribuan pemula dan profesional di seluruh dunia yang sedang belajar bahasa pemrograman yang sedang populer saat ini.</p>
          <p>Dengan kursus kami yang disusun secara profesional, anda akan :</p>
          <p>1. Menguasai dasat-dasar bahasa pemrograman dengan mudah.</p>
          <p>2. Memperluas keterampilan teknis anda untuk menghadapi tantangan masa depan.</p>
          <p>Jangan lewatkan kesempatan untuk memperdalam pemahaman anda tentang teknologi terkini.</p>
          <button onClick={handleNavigation} className="bg-unguMuda w-fit text-white font-semibold px-5 py-3 rounded-xl mx-auto">
            Selengkapnya..
          </button>
        </div>
        <div>
          <img className="w-full h-auto max-w-lg lg:max-w-md" src={IMAGES.gambar2} alt="" style={{ maxWidth: '500px' }} />
        </div>
      </div>
    </div>
  )
}

export default Course