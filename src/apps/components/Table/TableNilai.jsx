/* eslint-disable react/prop-types */
// import FormatDateAndTime from "../../helper/dateTime"


const TableNilai = ({ dataNilai }) => {
  return (
    <div className="rounded border mt-2 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

      <div>
        <div className="grid grid-cols-4 border-t rounded-t py-4.5 px-4 bg-unguMuda text-white sm:grid-cols-5 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">No</p>
          </div>
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="font-medium">Nama Materi</p>
          </div>
          <div className="col-span-1 items-center sm:flex">
            <p className="font-medium">Nilai</p>
          </div>
        </div>

        {
          dataNilai.map((data, index) => { 
            // const {formattedDate} = FormatDateAndTime(gejala.CREATED_AT)
          return (
            <div key={index} className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
              <div className="col-span-1 items-center">
                <p className="text-sm text-black dark:text-white">{index+1}</p>
              </div>
              <div className="col-span-3 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{data.DETAILS.NAMA_MATERI}</p>
              </div>
              <div className="col-span-1 items-center">
                {
                  data.STATUS == 1 ? 
                  <p className="text-sm text-black dark:text-white">100</p>
                  :
                  <p className="text-sm text-black dark:text-white">0</p>
                }
              </div>
            </div>
          )})
        }
      </div>
    </div>
  );
};

export default TableNilai;
