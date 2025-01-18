/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { RxAvatar } from "react-icons/rx";
import { IMAGES } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ServiceUser from "../../api/service/User.service";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const NavbarProfile = (props) => {
  const navigate = useNavigate()
  const [tokenAcc, setTokenAcc] = useState('')
  const Menu = [
    {
      Name: 'Home',
      path: '/'
    },
    {
      Name: 'Course',
      path: '/course-page'
    },
    {
      Name: 'About',
      path: '/about-page'
    },
    {
      Name: 'Contact',
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

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setTokenAcc(token)
  }, [])
  return (
    <header className="sticky top-0 z-999 flex w-full bg-black-2 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

        </div>
        <div>
          <Link to={'/'}>
            <img src={IMAGES.gambar3} alt="" style={{ width:'50px' }}/>
          </Link>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7 float-end">
        <ul className="flex flex-row items-center gap-5 text-white">
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
      </div>
    </header>
  );
}

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
    const decode = jwtDecode(token)
    const id = decode.IDUSER
    setIdUser(id)
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
            <RxAvatar className="text-3xl text-white" />
          </span>
        </div>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-3 flex w-62.5 flex-col rounded-md border text-white border-stroke bg-unguTua shadow-default dark:border-strokedark dark:bg-boxdark ${
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

export default NavbarProfile