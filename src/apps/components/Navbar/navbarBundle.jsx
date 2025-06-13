/* eslint-disable react/prop-types */
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { IMAGES } from "../../assets";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ServiceUser from "../../api/service/User.service";
import ServiceKategori from "../../api/service/Kategori.service";
import ServiceNilai from "../../api/service/Nilai.service";
import { FaBookOpen, FaRegUser } from "react-icons/fa";
import { MdLogout, MdHome, MdOutlineInfo, MdPermContactCalendar } from "react-icons/md";
import { Check, LockKeyhole, X, PanelsTopLeft } from "lucide-react";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { IoSpeedometer } from "react-icons/io5";

const NavbarBundle = () => {
  const navigate = useNavigate();
  const { idBundle } = useParams();
  const location = useLocation();
  const { pathname } = location;

  const [isOpen, setIsOpen] = useState(false);        // for hamburger menu (top right mobile)
  const [isSideOpen, setSideIsOpen] = useState(false); // for sidebar toggle (left side)
  const [idUser, setIdUser] = useState('');
  const [tokenAcc, setTokenAcc] = useState('');

  const [kategori, setKategori] = useState([]);
  const [progressBelajar, setProgressBelajar] = useState({ MATERI: [] });

  const trigger = useRef(null);
  const sidebarRef = useRef(null);

  const Menu = [
    { Name: "Home", Icon: MdHome, path: "/" },
    { Name: "Course", Icon: FaRegUser, path: "/course-page" },
    { Name: "About", Icon: MdOutlineInfo, path: "/about-page" },
    { Name: "Contact", Icon: MdPermContactCalendar, path: "/contact-page" },
  ];

  const handleNavigation = (path) => {
    const token = localStorage.getItem("accessToken");
    if (!token && path === "/course-page") {
      alert("Anda harus login terlebih dahulu untuk mengakses halaman ini.");
      navigate("/login-page");
      window.location.reload();
      return;
    }
    navigate(path);
    window.location.reload();
  };

  const handleLogout = async () => {
    try {
      const data = "";
      const response = await ServiceUser.logoutUser(data);
      console.log(response);
      localStorage.removeItem("accessToken");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch kategori for sidebar
  const getKategori = async () => {
    try {
      if (!idBundle) return;
      const dataBundle = await ServiceKategori.getByID(idBundle);
      setKategori(dataBundle.data[0]?.MATERI || []);
    } catch (error) {
      console.log("Error getting kategori:", error);
    }
  };

  // Fetch user progress for sidebar
  const getUserProgress = async () => {
    try {
      const tokenUser = localStorage.getItem("accessToken");
      if (!tokenUser) {
        console.log("Token tidak tersedia");
        return;
      }
      const decodeToken = jwtDecode(tokenUser);
      const userId = decodeToken.IDUSER;
      const response = await ServiceNilai.getNilaiByUserByKategori(userId, idBundle);
      if (response.data && response.data[0]?.MATERI) {
        setProgressBelajar(response.data[0]);
      } else {
        setProgressBelajar({ MATERI: [] });
      }
    } catch (error) {
      console.log("Error getting user progress:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setTokenAcc(token);
    if (token) {
      const decode = jwtDecode(token);
      setIdUser(decode.IDUSER);
    }
  }, []);

  useEffect(() => {
    getKategori();
    getUserProgress();
  }, [idBundle]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebarRef.current || !trigger.current) return;
      if (
        !isSideOpen ||
        sidebarRef.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSideIsOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close sidebar on Escape key
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!isSideOpen || keyCode !== 27) return;
      setSideIsOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [isSideOpen]);

  const handleNavigateMateri = (idMateri) => {
    navigate(`/course-page/video-page/${idBundle}/${idMateri}`);
    window.location.reload();
  };

  return (
    <div className="absolute w-full bg-black-2 text-white py-3 px-5 flex justify-center items-center shadow-sm">
      <div className="container max-w-7xl flex flex-row justify-between items-center">
        <div className="flex xl:hidden">
          <button
            ref={trigger}
            onClick={() => setSideIsOpen(!isSideOpen)}
            aria-label="Toggle sidebar"
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {isSideOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <PanelsTopLeft size={24} className="text-gray-800" />
            )}
          </button>
        </div>
        <div>
          <a href="/" aria-label="Homepage">
            <img
              src={IMAGES.gambar3}
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </a>
        </div>
        <nav className="hidden md:flex flex-row items-center gap-8">
          {Menu.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="font-semibold hover:text-indigo-600 transition-colors duration-300"
              aria-current={pathname === item.path ? "page" : undefined}
            >
              {item.Name}
            </button>
          ))}
          {!tokenAcc ? (
            <div className="flex flex-row gap-5 ml-10">
              <button
                onClick={() => navigate("/login-page")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/sign-up-page")}
                className="text-indigo-600 hover:underline px-4 py-2 rounded-md"
              >
                Register
              </button>
            </div>
          ) : (
            <PopUp idUser={idUser} onLogout={handleLogout} />
          )}
        </nav>
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {isOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <RxHamburgerMenu size={24} className="text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-unguTua opacity-40 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></motion.div>
      )}

      {/* Mobile menu */}
      {isOpen && (
        <motion.nav
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 h-full w-72 bg-unguTua shadow-lg z-40 flex flex-col p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <a href="/" aria-label="Homepage" className="flex items-center gap-2">
              <img
                src={IMAGES.gambar3}
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-bold text-indigo-600">LPlus</span>
            </a>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <X size={24} className="text-gray-800" />
            </button>
          </div>
          <ul className="flex flex-col gap-5 mb-8">
            {Menu.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    handleNavigation(item.path);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3.5 text-lg font-semibold text-white hover:text-indigo-600"
                >
                  <item.Icon />
                  {item.Name}
                </button>
              </li>
            ))}
          </ul>
          <hr />
          {!tokenAcc ? (
            <div className="flex flex-row gap-5">
              <button
                onClick={() => navigate("/login-page")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/sign-up-page")}
                className="text-indigo-600 hover:underline px-4 py-2 rounded-md"
              >
                Register
              </button>
            </div>
          ) : (
            <>
              <Link
                to={`/profile-page/nilai/${idUser}`}
                className="flex items-center gap-3.5 py-4 px-4 rounded-md font-medium text-white hover:bg-indigo-100"
              >
                <FaRegUser className="text-lg" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3.5 py-4 px-4 rounded-md font-medium text-white hover:bg-indigo-100"
              >
                <MdLogout className="text-lg" />
                Log Out
              </button>
            </>
          )}
        </motion.nav>
      )}

      {/* Sidebar left for desktop, keep old container structure but new content */}
      {isSideOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black-2 opacity-40 z-30"
          onClick={() => setSideIsOpen(false)}
          aria-hidden="true"
        ></motion.div>
      )}
      <motion.aside
        ref={sidebarRef}
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: isSideOpen ? 0 : -300, opacity: isSideOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-unguTua fixed top-0 left-0 h-screen w-72 shadow-lg rounded-r-xl overflow-y-auto z-40 p-6 text-gray-800"
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col justify-between gap-4">
          <p className="text-lg font-semibold text-gray-900 mb-4">All Course</p>

          <nav>
            {progressBelajar?.MATERI?.length === 0 ? (
              <ul className="space-y-2">
                {kategori.map((item, index) => (
                  <li key={index}>
                    <div className="flex items-center gap-2 bg-unguMuda rounded-md  hover:bg-indigo-200 text-indigo-700 p-3 font-medium cursor-not-allowed select-none">
                      <span className="w-6 text-center">{index}</span>
                      <span className="flex-grow">{item.NAMA_MATERI}</span>
                      <LockKeyhole className="w-5 h-5" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2">
                {progressBelajar?.MATERI?.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigateMateri(item.IDMATERI)}
                      className={`group flex w-full items-center gap-2 bg-unguMuda rounded-md p-3 font-medium text-gray-800 hover:bg-indigo-100 transition-colors duration-200 ${
                        pathname.includes("calendar") ? "bg-gray-100" : ""
                      }`}
                      aria-current={pathname.includes(item.IDMATERI) ? "page" : undefined}
                    >
                      <span className="w-6 text-center">{index + 1}</span>
                      <span className="flex-grow text-left">{item.DETAIL.NAMA_MATERI}</span>
                      {item.STATUS !== 0 && (
                        <Check className="ml-auto w-5 h-5 text-white" aria-label="Completed" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>
      </motion.aside>
    </div>
  );
};

const PopUp = ({ idUser, onLogout }) => {
  const [role, setRole] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
      if(token){
        const decode = jwtDecode(token)
        const role = decode.ROLE
        setRole(role)
      }
  }, [])
  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 ms-5"
        to="#"
      >
        <div className="bg-unguTua hover:bg-unguMuda p-1 rounded-full">
          <span className="icon">
            <RxAvatar className="text-3xl" />
          </span>
        </div>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-3 flex w-62.5 flex-col rounded-md border border-stroke bg-unguTua shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        {
          role === 'Admin' ?
          <Link 
            to={`/Admin/dashboard-page`}
            className="flex items-center gap-3.5 py-4 px-4 text-sm rounded-t-md font-medium duration-300 ease-in-out hover:bg-unguMuda lg:text-base"
          >
            <IoSpeedometer className="text-lg" />
            Dashboard
          </Link>
          :
          null
        }
        <Link 
          to={`/profile-page/my-learning/${idUser}`}
          className="flex items-center gap-3.5 py-4 px-4 text-sm rounded-t-md font-medium duration-300 ease-in-out hover:bg-unguMuda lg:text-base"
        >
          <FaRegUser className="text-lg" />
          Profile
        </Link>
        <Link 
          to={`/my-learning/${idUser}`}
          className="flex items-center gap-3.5 py-4 px-4 text-sm rounded-t-md font-medium duration-300 ease-in-out hover:bg-unguMuda lg:text-base"
        >
          <FaBookOpen className="text-lg" />
          My Learning
        </Link>
        <hr />
        <button 
          onClick={onLogout}
          className="flex items-center gap-3.5 py-4 px-4 text-sm rounded-b-md font-medium duration-300 ease-in-out hover:bg-unguMuda lg:text-base"
        >
          <MdLogout className="text-lg" />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default NavbarBundle;

