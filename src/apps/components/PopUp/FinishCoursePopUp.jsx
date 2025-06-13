import { Home, LogInIcon } from "lucide-react";

/* eslint-disable react/prop-types */
const FinishCoursePopUp = ({ onClose, link }) => {
  return (
    <div 
    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out`}
    >
      <div className="bg-unguTua p-5 rounded-lg shadow-lg w-80 text-white">
        <h2 className="text-lg font-semibold mb-4">Kamu Belum Login, Silahkan login terlebih dulu !!!</h2>
        <div className="flex justify-around mt-3">
          <a
            href='/login-page'
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-1 bg-unguTua px-3 py-2 rounded-md text-base font-semibold hover:scale-105 transition-transform duration-200"
          >
            <LogInIcon className="text-xl text-blue-800 hover:text-blue-600" />
            Login
          </a>
          <a
            href='/'
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-1 bg-unguTua px-3 py-2 rounded-md text-base font-semibold hover:scale-105 transition-transform duration-200"
          >
            <Home className="text-xl text-blue-800 hover:text-blue-600" />
            Home
          </a>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-kuning hover:bg-red-600 text-unguTua font-semibold py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default FinishCoursePopUp
