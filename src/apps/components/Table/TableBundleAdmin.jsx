/* eslint-disable react/prop-types */
// import FormatDateAndTime from "../../helper/dateTime"

import { useNavigate } from "react-router-dom";
import ServiceKategori from "../../api/service/Kategori.service";
import SweetAlertService from "../../helper/sweetalertService";

const TableBundleAdmin = ({ dataNilai }) => {
  const navigate = useNavigate()
  const handleUpdateStatus = async (idKategori) => {
    try {
      const data = {}
      const token = localStorage.getItem('accessToken')
      const response = await ServiceKategori.udpateStatusKategori(idKategori, data, token)
      if (response.status === false) {
        return SweetAlertService.showError("Error", response.message)
      }
      SweetAlertService.showSuccess("Success", response.message)
      return window.location.reload()
    } catch (error) {
      return SweetAlertService.showError("Error", error.message || "Unknown error")
    }
  }

  const navigateEdit = (idBundle) => {
    return navigate(`/Admin/bundle-page/edit-bundle/${idBundle}`)
  }
  
  const DeleteBundle = async (idBundle) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await ServiceKategori.deleteKategori(idBundle, token)
      if (response.status === false) {
        return SweetAlertService.showError("Error", response.message)
      }
      SweetAlertService.showSuccess("Success", response.message)
      return window.location.reload()
    } catch (error) {
      return SweetAlertService.showError("Error", error.message || "Unknown error")
    }
  }
  return (
    <div className="rounded border mt-2 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

      <div>
        <div className="grid grid-cols-7 border-t rounded-t py-4.5 px-4 bg-unguMuda text-white sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">No</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Nama Bundle</p>
          </div>
          <div className="col-span-1 items-center sm:flex">
            <p className="font-medium">Rating</p>
          </div>
          <div className="col-span-1 items-center sm:flex">
            <p className="font-medium">Students</p>
          </div>
          <div className="col-span-1 items-center sm:flex">
            <p className="font-medium">Status</p>
          </div>
          <div className="col-span-2 items-center sm:flex">
            <p className="font-medium">Action</p>
          </div>
        </div>

        {
          dataNilai.map((data, index) => { 
            // const {formattedDate} = FormatDateAndTime(gejala.CREATED_AT)
          return (
            <div key={index} className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-1 items-center">
                <p className="text-sm text-black dark:text-white">{index+1}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{data.KATEGORI}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm dark:text-whit text-black px-1">{data.RATING}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{data.STUDENTS}</p>
              </div>
              {
                data.STATUS === 1
                ?
                <div className="col-span-1 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">Published</p>
                </div>
                :
                <div className="col-span-1 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">Not Published</p>
                </div>
              }
              <div className="col-span-2 hidden items-center sm:flex gap-2">
                {/* <button className="bg-yellow-500 px-2 py-1 rounded-md" onClick={() => navigateEdit(data.IDKATEGORI)}>
                  Edit
                </button> */}
                <button className="bg-red-500 px-2 py-1 rounded-md" onClick={() => DeleteBundle(data.IDKATEGORI)}>
                  Delete
                </button>
                {
                  data.STATUS === 0 
                  ?
                    <button className="bg-blue-300 px-2 py-1 rounded-md" onClick={() => handleUpdateStatus(data.IDKATEGORI)}>
                      Publish
                    </button>
                  :
                    <button className="bg-blue-300 px-2 py-1 rounded-md" onClick={() => handleUpdateStatus(data.IDKATEGORI)}>
                      Unpublish
                    </button>
                }
              </div>
            </div>
          )})
        }
      </div>
    </div>
  );
};

export default TableBundleAdmin;
