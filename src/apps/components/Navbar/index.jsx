import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { IMAGES } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ServiceUser from "../../api/service/User.service";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
// import { jwtDecode } from "jwt-decode";

const Navbar = () => {
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
          <button>
            <RxHamburgerMenu />
          </button>
        </div>
      </div>
      
    </div>
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