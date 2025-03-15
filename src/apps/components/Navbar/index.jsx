import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { IMAGES } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ServiceUser from "../../api/service/User.service";
import { FaDiscourse, FaRegUser } from "react-icons/fa";
import { MdLogout, MdHome, MdOutlineInfo, MdPermContactCalendar } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

import { X } from "lucide-react";
import { motion } from "framer-motion";
// import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [idUser, setIdUser] = useState('')
  const [tokenAcc, setTokenAcc] = useState('')
  const Menu = [
    {
      Name: 'Home',
      Icon: MdHome,
      path: '/'
    },
    {
      Name: 'Course',
      Icon: FaDiscourse,
      path: '/course-page'
    },
    {
      Name: 'About',
      Icon: MdOutlineInfo,
      path: '/about-page'
    },
    {
      Name: 'Contact',
      Icon: MdPermContactCalendar,
      path: '/contact-page'
    },
  ]

  const handleNavigation = (path) => {
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

  const handleLogout = async () => {
    try {
      const data = ''
      const response = await ServiceUser.logoutUser(data)
      console.log(response)
      localStorage.removeItem('accessToken')
      // SweetAlertService.showSuccess("Success", response.message)
      navigate('/')
      window.location.reload();
    } catch (error) {
      console.log(error)
      // SweetAlertService.showError("Error", error.message)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setTokenAcc(token)
    if(token){
      const decode = jwtDecode(token)
      const id = decode.IDUSER
      setIdUser(id)
    }
  }, [])
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if(token){
      const decode = jwtDecode(token)
      const id = decode.IDUSER
      setIdUser(id)
    }
  }, [])
  return (
    <div className=" absolute w-full bg-black-2 text-white py-3 px-5 flex justify-center items-center">
      <div className="container flex flex-row justify-between items-center">
        <div>
          <a href="/">
            <img src={IMAGES.gambar3} alt="" style={{ width:'50px' }}/>
          </a>
        </div>
        <div className="hidden md:flex">
        <ul className="flex flex-row items-center gap-5">
          {
            Menu.map((item, index) => (
              <li className="font-semibold" key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className=""
                >
                  {item.Name}
                </button>
              </li>
            ))
          }
        </ul>
          {
            tokenAcc === null || tokenAcc === undefined ? 
            <div className="ms-10 flex flex-row gap-5">
              <button className="bg-purple-800 hover:bg-purple-700 px-3 py-2 rounded-md" onClick={()=>navigate('/login-page')}>
                Sign in
              </button>
              <button className="hover:text-purple-500" onClick={()=>navigate('/sign-up-page')}>
                Sign up
              </button>
            </div>
            : 
            <PopUp />
          }
        </div>
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)} 
          >
            {isOpen ? <X size={24} /> : <RxHamburgerMenu size={24} />}
          </button>
        </div>
      </div>
      <div className="relative">
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.5 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black-2 z-30"
          onClick={() => setIsOpen(false)}
        ></motion.div>
      )}
      {/* Sidebar with animation */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }} 
        animate={{ x: isOpen ? 0 : -300, opacity: isOpen ? 1 : 0 }} 
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-unguTua fixed top-0 left-0 h-full w-75 bg-gray-900 text-white z-40 p-5"
      >
        <div className="text-xl font-bold flex justify-center">
          <a href="/" className="flex flex-row items-start gap-3">
            <img src={IMAGES.gambar3} alt="" style={{ width:'50px' }}/>
            <span className="text-4xl">LPlus</span>
          </a>
        </div>
        <hr className="mt-4"/>
        <ul className="mt-5">
          {
            Menu.map((item, index) => (
              <li key={index}>
                <button 
                onClick={() => handleNavigation(item.path)}
                className="flex w-full items-center gap-3.5 py-4 px-4 text-sm rounded-b-md font-medium duration-300 ease-in-out hover:bg-unguMuda lg:text-base"
              >
                <item.Icon className="text-lg" />
                {item.Name}
              </button>
              </li>
            ))
          }
          
          {/* <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">About</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">Services</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">Contact</a></li> */}
        </ul>
        <hr className="mt-4" />
          {
            tokenAcc === null || tokenAcc === undefined ? 
            <div className="flex flex-row gap-5 mt-5 justify-center">
              <button className="bg-purple-800 hover:bg-unguMuda px-3 py-2 rounded-md" onClick={()=>navigate('/login-page')}>
                Sign in
              </button>
              <button className="hover:text-purple-500" onClick={()=>navigate('/sign-up-page')}>
                Sign up
              </button>
            </div>
            : 
            <>
              <Link 
                to={`/profile-page/nilai/${idUser}`}
                className="flex items-center gap-3.5 py-4 px-4 text-sm rounded-sm font-medium duration-300 ease-in-out hover:bg-unguMuda lg:text-base"
              >
                <FaRegUser className="text-lg" />
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full gap-3.5 py-4 px-4 text-sm rounded-sm font-medium duration-300 ease-in-out hover:bg-unguMuda lg:text-base"
              >
                <MdLogout className="text-lg" />
                Log Out
              </button>
            </>
          }
      </motion.div>
    </div>
      
    </div>
  );
}

// import { useState } from "react";


// function Sidebar() {
  

//   return (
    
//   );
// }

const PopUp = () => {
  const [idUser, setIdUser] = useState('')
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const handleLogout = async () => {
    try {
      const data = ''
      const response = await ServiceUser.logoutUser(data)
      console.log(response)
      localStorage.removeItem('accessToken')
      // SweetAlertService.showSuccess("Success", response.message)
      navigate('/')
      window.location.reload();
    } catch (error) {
      console.log(error)
      // SweetAlertService.showError("Error", error.message)
    }
  }

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
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
      const token = localStorage.getItem('accessToken')
      if(token){
        const decode = jwtDecode(token)
        const id = decode.IDUSER
        setIdUser(id)
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
        <Link 
          to={`/profile-page/nilai/${idUser}`}
          className="flex items-center gap-3.5 py-4 px-4 text-sm rounded-t-md font-medium duration-300 ease-in-out hover:bg-unguMuda lg:text-base"
        >
          <FaRegUser className="text-lg" />
          Profile
        </Link>
        <hr />
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3.5 py-4 px-4 text-sm rounded-b-md font-medium duration-300 ease-in-out hover:bg-unguMuda lg:text-base"
        >
          <MdLogout className="text-lg" />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  )
}

export default Navbar