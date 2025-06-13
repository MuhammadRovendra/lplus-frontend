/* eslint-disable react/prop-types */
// import FormatDateAndTime from "../../helper/dateTime"

import ServiceMateri from "../../api/service/Materi.service";
import SweetAlertService from "../../helper/sweetalertService";

const TabelMateri = ({ dataNilai }) => {

  const DeleteBundle = async (idBundle) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await ServiceMateri.daleteMateri(idBundle, token)
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
        <div className="grid grid-cols-7 border-t rounded-t py-4.5 px-4 bg-unguMuda text-white sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">No</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Nama Bundle</p>
          </div>
          <div className="col-span-1 items-center sm:flex">
            <p className="font-medium">Kategori</p>
          </div>
          <div className="col-span-2 items-center sm:flex">
            <p className="font-medium">Total Like</p>
          </div>
          <div className="col-span-1 items-center sm:flex">
            <p className="font-medium">Action</p>
          </div>
        </div>

        {
          dataNilai?.map((data, index) => { 
            // const {formattedDate} = FormatDateAndTime(gejala.CREATED_AT)
          return (
            <div key={index} className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
              <div className="col-span-1 items-center">
                <p className="text-sm text-black dark:text-white">{index+1}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{data.NAMA_MATERI}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm dark:text-whit text-black px-1">{data.CATEGORY_DATA.KATEGORI}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{data.JUMLAH_LIKE}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex gap-2">
                <button className="bg-yellow-500 px-2 py-1 rounded-md">
                  Edit
                </button>
                <button className="bg-red-500 px-2 py-1 rounded-md" onClick={() => DeleteBundle(data.IDKATEGORI)}>
                  Delete
                </button>
              </div>
            </div>
          )})
        }
      </div>
    </div>
  );
};

export default TabelMateri;
