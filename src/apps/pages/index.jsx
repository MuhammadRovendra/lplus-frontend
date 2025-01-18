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

export const page = {
  Landing: <Landing />,
  Login: <Login />,
  SignUp: <SignUp />,
  About: <About />,
  Contact: <Contact />,
  Course: <Course />,
  VideoPage: <VideoPage />,
  RingkasanPage: <RingkasanPage />,
  ContohCode: <ContohCodePage />,
  SoalPage: <SoalPage />,
  NilaiPage: <NilaiPage />,
  RenamePage: <RenamePage />,
  RepasswordPage: <RepasswordPage />,
}