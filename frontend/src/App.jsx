import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Layout from "./layout/Layout"
import Contex from "./context/Contex"
import AppointmentForm from "./pages/AppointmentForm";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Errorpage = lazy(() => import("./pages/Errorpage"));
const Servicepage = lazy(() => import("./pages/Servicepage"));
const Doctorspage = lazy(() => import("./pages/Doctorspage"));
const DoctorProfilePage = lazy(() => import("./pages/DoctorProfilePage"));
const Departmentspage = lazy(() => import("./pages/Departmentspage"));
const Aboutpage = lazy(() => import("./pages/Aboutpage"));
const Contactpage = lazy(() => import("./pages/Contactpage"));


// Admin imports
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminProtectedRoute = lazy(() => import("./admin/AdminProtectedRoute"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminDoctors = lazy(() => import("./admin/AdminDoctors"));
const AdminServices = lazy(() => import("./admin/AdminServices"));
const AdminDepartments = lazy(() => import("./admin/AdminDepartments"));
const AdminAppointments = lazy(() => import("./admin/AdminAppointments"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Errorpage/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/services',
          element: <Servicepage />
        },
        {
          path: '/doctors',
          element: <Doctorspage />
        },
        {
          path: '/doctors/:id',
          element: <DoctorProfilePage />
        },
        {
          path: '/departments',
          element: <Departmentspage />
        },
        {
          path: '/about',
          element: <Aboutpage />
        },
        {
          path: '/contact',
          element: <Contactpage />
        },
        {
          path: '/appointment',
          element: <AppointmentForm />
        }
      ]
    },
    // Admin Routes
    {
      path: '/vhrc-admin',
      element: <AdminLogin />
    },
    {
      path: '/vhrc-admin',
      element: (
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      ),
      children: [
        {
          path: 'dashboard',
          element: <AdminDashboard />
        },
        {
          path: 'doctors',
          element: <AdminDoctors />
        },
        {
          path: 'services',
          element: <AdminServices />
        },
        {
          path: 'departments',
          element: <AdminDepartments />
        },
        {
          path: 'appointments',
          element: <AdminAppointments />
        }
      ]
    }
  ])
  
  return (
    <Contex>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="top-right" />
    </Contex>
  )
}

export default App