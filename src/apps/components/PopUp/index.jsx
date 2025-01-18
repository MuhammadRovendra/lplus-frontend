import { useState } from "react";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa"

/* eslint-disable react/prop-types */
const SharePopup = ({ onClose, link }) => {
  const [copySuccess, setCopySuccess] = useState(false);


  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div 
    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
      link ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    >
      <div className="bg-unguTua p-5 rounded-lg shadow-lg w-80 text-white">
        <h2 className="text-lg font-semibold mb-4">Share This Course</h2>
        {copySuccess && (
          <p className="text-green-400 text-xs text-center mt-2">Copied to clipboard!</p>
        )}
        <div onClick={handleCopy} className="bg-blue-gray-100 px-2 py-1 flex items-center justify-center rounded">
          <p className="text-blue-gray-700 text-sm truncate max-w-xs">
            {link}
          </p>
        </div>
        <div className="flex justify-around mt-3">
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-base font-semibold hover:scale-105 transition-transform duration-200"
          >
            <FaFacebook className="text-4xl text-blue-800 hover:text-blue-600" />
            Facebook
          </a>
          <a 
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=Check+this+out!`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-base font-semibold hover:scale-105 transition-transform duration-200"
          >
            <FaTwitter className="text-4xl text-blue-300 hover:text-blue-200" />
            Twitter
          </a>
          <a 
            href={`https://wa.me/?text=${encodeURIComponent('Check out this amazing course! ' + link)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-base font-semibold hover:scale-105 transition-transform duration-200"
          >
            <FaWhatsapp className="text-4xl text-green-600 hover:text-green-400" />
            WhatsApp
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

export default SharePopup
