
import Layout from "./Layout"
import { useNavigate, useParams } from "react-router-dom"

const SettingAccountPage = () => {
  const {idUser} = useParams()
  const navigate = useNavigate()

  const HandleNavigate = async (path) => {
    navigate(path)
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold mt-12 md:mt-15">Setting Account</h1>
          <div className="flex flex-col gap-4 p-10 bg-white rounded-lg min-h-full w-fit justify-center items-center mt-8">
            <div className="flex flex-col gap-2 text-sm">
              <div>
                <button className="bg-unguMuda w-full text-white py-5 mt-1 px-2 rounded" onClick={() => HandleNavigate(`/profile-page/rename/${idUser}`)}>
                  Rename
                </button>
                <button className="bg-unguMuda w-full text-white py-5 mt-1 px-2 rounded" onClick={() => HandleNavigate(`/profile-page/repassword/${idUser}`)}>
                  Repassword
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SettingAccountPage