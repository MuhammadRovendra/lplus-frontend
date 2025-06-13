import Landing from './landingPage'
import Login from './access/LoginForm'
import SignUp from './access/SignupForm'
import About from './About'
import Contact from './contact'
import Course from './Course'
import VideoPage from './materi/video'
import RingkasanPage from './materi/Ringkasan'
import SoalPage from './materi/Soal'
import ContohCodePage from './materi/ContohCode'
import NilaiPage from './profile/NilaiPage'
import RenamePage from './profile/RenamePage'
import RepasswordPage from './profile/RepasswordPage'
import DeskripsiBundlePage from './materi/DeskripsiBundle'
import DashboardPage from './Admin/DashboardPage'
import MyLearningPage from './MyLearning'
import MyLearningpPofilePage from './profile/MyLearningPage'
import BundlePage from './Admin/BundlePage'
import MateriPage from './Admin/MateriPage'
import AddBundlePage from './Admin/AddBundlePage'
import AddMateriPage from './Admin/AddMateriPage'
import SettingAccountAdminPage from './Admin/SettingAccountAdminPage'
import RepasswordAdminPage from './Admin/RepasswordPage'
import RenameAdminPage from './Admin/RenamePage'
import EditBundlePage from './Admin/EditBundlePage'
import SettingAccountPage from './profile/SettingAccountPage'

export const page = {
  Landing: <Landing />,
  Login: <Login />,
  SignUp: <SignUp />,
  About: <About />,
  Contact: <Contact />,
  MyLearning: <MyLearningPage />,
  Course: <Course />,
  DeskripsiBundlePage: <DeskripsiBundlePage />,
  VideoPage: <VideoPage />,
  RingkasanPage: <RingkasanPage />,
  ContohCode: <ContohCodePage />,
  SoalPage: <SoalPage />,
  MyLearningProfilePage: <MyLearningpPofilePage />,
  NilaiPage: <NilaiPage />,
  RenamePage: <RenamePage />,
  RepasswordPage: <RepasswordPage />,
  SettingAccountPage: <SettingAccountPage />,
  DashboardPage: <DashboardPage />,
  BundlePage: <BundlePage />,
  MateriPage: <MateriPage />,
  AddBundlePage: <AddBundlePage />,
  EditBundlePage: <EditBundlePage />,
  AddMateriPage: <AddMateriPage />,
  SettingAccountAdminPage: <SettingAccountAdminPage />,
  RenameAdminPage: <RenameAdminPage />,
  RepasswordAdminPage: <RepasswordAdminPage />,
}