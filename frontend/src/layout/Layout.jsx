import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { UseCustomContext } from '../context/Contex'
import AppointmentForm from '../pages/AppointmentForm'

const Layout = () => {
  const {showAppointmentForm, setShowAppointmentForm} = UseCustomContext()
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
{showAppointmentForm && (
  <div
    className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
    onClick={() => setShowAppointmentForm(false)}
  >
    {/* Clean Modal Container */}
    <div
      className="relative w-full max-w-2xl max-h-[80vh] top-15 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20"
      onClick={(e) => e.stopPropagation()}
    >
      
      {/* Header: Minimal & Professional */}
      <div className="flex justify-between items-center px-8 py-5 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Book Appointment</h2>
          <p className="text-sm text-slate-500 font-medium">Get priority healthcare assistance</p>
        </div>
        <button 
          onClick={() => setShowAppointmentForm(false)}
          className="group p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div className="overflow-y-auto p-4 custom-scrollbar">
        <AppointmentForm />
      </div>

      {/* Subtle Footer */}
      <div className="px-8 py-4 bg-slate-50/80 border-t border-gray-100 flex justify-center items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure 256-bit Encrypted Form</span>
      </div>
    </div>
  </div>
)}

    </>
  )
}

export default Layout