/* eslint-disable react/prop-types */
const TableNilai = ({ dataNilai }) => {
  console.log(dataNilai)
  return (
    <div className="rounded border mt-2 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

      <div>
        <div className="grid grid-cols-7 border-t rounded-t py-4.5 px-4 bg-unguMuda text-white sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">No</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
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
            <div key={index} className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
              <div className="col-span-1 items-center">
                <p className="text-sm text-black dark:text-white">{index+1}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{data.DETAIL?.NAMA_MATERI}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm dark:text-white text-black px-1 rounded-full">{data.STATUS === 0 ? '0' : '100'}</p>
              </div>
            </div>
          )})
        }
      </div>
    </div>
  );
};

export default TableNilai;
