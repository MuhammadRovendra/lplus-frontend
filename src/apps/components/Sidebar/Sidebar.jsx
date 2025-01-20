/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';

import { FaAddressCard, FaClipboardList } from "react-icons/fa";
import { GoPasskeyFill } from 'react-icons/go';
import { MdLogout } from 'react-icons/md';
import ServiceUser from '../../api/service/User.service';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const {idUser} = useParams()

  const [user, setUser] = useState({})

  const itemMenuSidebar = [
    {
      name: "Nilai",
      icon: FaClipboardList ,
      path: `/profile-page/nilai/${idUser}`
    },
    {
      name: "Rename",
      icon: FaAddressCard,
      path: `/profile-page/rename/${idUser}`
    },
    {
      name: "Re-password",
      icon: GoPasskeyFill,
      path: `/profile-page/repassword/${idUser}`
    },
  ]

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const getUser = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await ServiceUser.getUserById(idUser, token)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
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
    getUser()
  }, [])
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-unguTua duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex flex-col items-center justify-between gap-2 px-6 py-5.5 mt-18 lg:py-6.5">
        <span>
          <img src={'https://avatar.iran.liara.run/public/boy'} alt="Logo" className="w-31 lg" />
        </span>
        <p className='text-white mt-3 capitalize font-bold'>{user.NAME}</p>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-0 py-4 px-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              Main Profile
            </h3>

            <ul className="flex flex-col gap-1.5">
              {
                itemMenuSidebar.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-unguMuda dark:hover:bg-meta-4 ${
                        pathname.includes('calendar') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <item.icon />
                      { item.name }
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
      <button
        onClick={handleLogout}
        className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 mx-6 mt-auto mb-5 font-medium text-bodydark1 duration-300 ease-in-out bg-red-700 hover:bg-red-400 dark:hover:bg-meta-4 ${
        pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'
        }`}
      >
        <MdLogout />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
