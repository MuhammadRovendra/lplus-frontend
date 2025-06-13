/* eslint-disable react/prop-types */
// import FormatDateAndTime from "../../helper/dateTime"

import { useNavigate, useParams } from "react-router-dom";


const TableBundle = ({ dataNilai }) => {
  const {idUser} = useParams()
  const navigate = useNavigate()
  
  const handleNavigateToRecap = (idBundle) => {
    return navigate(`/profile-page/nilai/${idBundle}/${idUser}`)
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
          <div className="col-span-2 items-center sm:flex">
            <p className="font-medium">Progress</p>
          </div>
          <div className="col-span-1 items-center sm:flex">
            <p className="font-medium">Nilai</p>
          </div>
          <div className="col-span-1 items-center sm:flex">
            <p className="font-medium">Action</p>
          </div>
        </div>

        {
          dataNilai.map((data, index) => { 
            // const {formattedDate} = FormatDateAndTime(gejala.CREATED_AT)
          return (
            <div key={index} className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
              <div className="col-span-1 items-center">
                <p className="text-sm text-black dark:text-white">{index+1}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{data.LEVEL}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm dark:text-white bg-unguTua text-white px-1 rounded-full">{data.NILAI.toFixed(2)}%</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{data.NILAI.toFixed(2)}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <button onClick={() => handleNavigateToRecap(data.IDNILAI)} className="bg-unguMuda hover:bg-purple-500 text-white px-2 py-1 rounded-md shadow-3">
                  Rekap Nilai
                </button>
              </div>
            </div>
          )})
        }
      </div>
    </div>
  );
};

export default TableBundle;
