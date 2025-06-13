import { createBrowserRouter } from "react-router-dom";
import { page } from "../pages";
import { RequireRole } from "./utils/requireAuth";

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
    path: '/my-learning/:idUser',
    element: page.MyLearning
  },
  {
    path: '/profile-page/my-learning/:idUser',
    element: page.MyLearningProfilePage
  },
  {
    path: '/profile-page/nilai/:idBundle/:idUser',
    element: page.NilaiPage
  },
  {
    path: '/profile-page/setting-user/:idUser',
    element: page.SettingAccountPage
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
    path: '/course-page/deskripsi-bundle-page/:idBundle',
    element: page.DeskripsiBundlePage
  },
  {
    path: '/course-page/video-page/:idBundle/:idMateri',
    element: page.VideoPage
  },
  {
    path: '/course-page/ringkasan-page/:idBundle/:idMateri',
    element: page.RingkasanPage
  },
  {
    path: '/course-page/contoh-code-page/:idBundle/:idMateri',
    element: page.ContohCode
  },
  {
    path: '/course-page/soal-page/:idBundle/:idMateri',
    element: page.SoalPage
  },
  {
    path: '/sign-up-page',
    element: page.SignUp
  },
  {
    path: '/',
    element: <RequireRole allowedRoles={['Admin']} redirectPath='/'/>,
    children: [
      {
        path: '/Admin/dashboard-page',
        element: page.DashboardPage
      },
      {
        path: '/Admin/bundle-page',
        element: page.BundlePage
      },
      {
        path: '/Admin/bundle-page/add-bundle',
        element: page.AddBundlePage
      },
      {
        path: '/Admin/bundle-page/edit-bundle/:idBundle',
        element: page.EditBundlePage
      },
      {
        path: '/Admin/materi-page',
        element: page.MateriPage
      },
      {
        path: '/Admin/materi-page/add-materi',
        element: page.AddMateriPage
      },
      {
        path: '/Admin/Account-setting',
        element: page.SettingAccountAdminPage
      },
      {
        path: '/Admin/Account-setting/rename-page',
        element: page.RenameAdminPage
      },
      {
        path: '/Admin/Account-setting/repassword-page',
        element: page.RepasswordAdminPage
      },
    ]
  }
])

export default router