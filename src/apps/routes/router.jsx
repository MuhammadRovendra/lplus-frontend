import { createBrowserRouter } from "react-router-dom";
import { page } from "../pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: page.Landing
  },
  {
    path: '/course-page',
    element: page.Course
  },
  {
    path: '/about-page',
    element: page.About
  },
  {
    path: '/contact-page',
    element: page.Contact
  },
  {
    path: '/login-page',
    element: page.Login
  },
  {
    path: '/profile-page/nilai/:idUser',
    element: page.NilaiPage
  },
  {
    path: '/profile-page/rename/:idUser',
    element: page.RenamePage
  },
  {
    path: '/profile-page/repassword/:idUser',
    element: page.RepasswordPage
  },
  {
    path: '/course-page/video-page/:idMateri',
    element: page.VideoPage
  },
  {
    path: '/course-page/ringkasan-page/:idMateri',
    element: page.RingkasanPage
  },
  {
    path: '/course-page/contoh-code-page/:idMateri',
    element: page.ContohCode
  },
  {
    path: '/course-page/soal-page/:idMateri',
    element: page.SoalPage
  },
  {
    path: '/sign-up-page',
    element: page.SignUp
  },
])

export default router