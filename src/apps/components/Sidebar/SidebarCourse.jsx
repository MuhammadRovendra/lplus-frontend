/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ServiceKategori from '../../api/service/Kategori.service';
import { Check, LockKeyhole } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import ServiceNilai from '../../api/service/Nilai.service';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const { idBundle } = useParams();
  const [kategori, setKategori] = useState([]);
  const [progressBelajar, setProgressBelajar] = useState({ MATERI: [] });

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const getKategori = async () => {
    try {
      const dataBundle = await ServiceKategori.getByID(idBundle);
      // console.log(dataBundle)s
      setKategori(dataBundle.data[0]?.MATERI || []);
    } catch (error) {
      console.log('Error getting kategori:', error);
    }
  };

  const getUser = async () => {
    try {
      const tokenUser = localStorage.getItem('accessToken');
      if (!tokenUser) {
        console.log("Token tidak tersedia");
        return;
      }

      const decodeToken = jwtDecode(tokenUser);
      const idUser = decodeToken.IDUSER;

      const response = await ServiceNilai.getNilaiByUserByKategori(idUser, idBundle);
      console.log(response)
      if (response.data && response.data[0]?.MATERI) {
        setProgressBelajar(response.data[0]);
      } else {
        setProgressBelajar({ MATERI: [] });
      }
    } catch (error) {
      console.log('Error getting user progress:', error);
    }
  };
  
  const handleNavigate = (idMateri) => {
    navigate(`/course-page/video-page/${idBundle}/${idMateri}`)
    return window.location.reload()
  }

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, []);

  useEffect(() => {
    getKategori();
    getUser();
  }, []);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 hidden xl:flex h-screen w-72.5 flex-col overflow-y-hidden bg-unguTua duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col justify-between gap-2 px-6 py-5.5">
        <p className='text-white capitalize font-bold'>All Course</p>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-0 px-2">
          <div>
            {progressBelajar?.MATERI?.length === 0 ? (
              <ul className="flex flex-col gap-1.5">
                {kategori.map((item, index) => (
                  <li key={index}>
                      <div className="bg-unguMuda hover:bg-purple-400 group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4">
                        <span>{index + 1}</span>
                        {item.NAMA_MATERI}
                        <span className="ms-auto"><LockKeyhole /></span>
                      </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {progressBelajar?.MATERI?.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigate(item.IDMATERI)}
                      className={`bg-unguMuda hover:bg-purple-400 group relative w-full flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4 ${
                        pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <span>{index + 1}</span>
                      {item.DETAIL.NAMA_MATERI}
                      {
                        item.STATUS === 0 
                        ? 
                        null
                        :
                        <span className="ms-auto"><Check /></span>
                      }
                      {/* <span className="ms-auto"><Check /></span> */}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
