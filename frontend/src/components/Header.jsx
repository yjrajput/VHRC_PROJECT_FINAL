import React, { useState } from 'react'
import { Heart, Stethoscope, Users, Shield, Star, Phone, Menu, X, Mail, Flag } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { UseCustomContext } from '../context/Contex'
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navMenu = [
    { id: 1, path: '/', display: 'Home', icon: Heart },
    { id: 2, path: '/services', display: 'Services', icon: Stethoscope },
    { id: 3, path: '/doctors', display: "Doctors", icon: Users },
    { id: 4, path: '/departments', display: 'Departments', icon: Shield },
    { id: 5, path: '/about', display: 'About', icon: Star },
    { id: 6, path: '/contact', display: 'Contact', icon: Phone },
  ]

  const navigate = useNavigate();

  const { onBookAppointment } = UseCustomContext();


  return (
    <header className="bg-[#193151] shadow-lg border-b border-blue-100 sticky top-0 z-999">
      {/* top bar */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="w-full flex justify-between space-x-6">
              <button onClick={() => window.open('tel:+91 7733442244', '_self')} className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Emergency:</span>
                <span className="font-medium">+91 7733442244</span>
              </button>

              <button onClick={() => window.open('mailto:info@healthcarehub.com', '_self')} className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@healthcarehub.com</span>
              </button>
            </div>
          </div>
        </div>
      </div> */}

    <div className="ticker-bar">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="ticker-inner">
        <div className="ticker-label">Notice</div>
        <div className="ticker-track">
          <div className="ticker-content">
            <span>OPD Timings: Monday – Saturday · 9:00 AM – 2:00 PM</span>
            <span>Emergency Services: 24×7 Available — Call 9407459143</span>
            <span>New: Advanced Cardiology Unit Now Operational</span>
            <span>Free Health Camp every Sunday · Pre-registration required</span>
            <span>न्यूनतम् शुल्क - श्रेष्ठतम् चिकित्सा — सेवा ही हमारा धर्म है</span>
          </div>
        </div>
      </div>
    </div>
  </div>

      {/* main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 hover:scale-105" onClick={() => navigate('/')}>
            <div className="flex items-center gap-3">
              <div className="flex items-center text-3xl font-black italic tracking-tighter">
                <span className="text-blue-300">V</span>
                <span className="text-[#D74552] text-4xl mx-[-3px]">+</span>
                <span className="text-blue-300">RC</span>
              </div>
              <div className="flex flex-col justify-center leading-none text-left">
                <span className="text-blue-300 text-lg sm:text-xl font-bold tracking-tight">Vijaylaxmi Hospital</span>
                <span className="text-[#D74552] text-[10px] sm:text-xs font-bold tracking-wide mt-1">And Research Center</span>
              </div>
            </div>
          </button>


          {/* desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {
              navMenu.map((items) => {
                const IconComponent = items.icon;

                return (
                  <NavLink
                    to={items.path}
                    key={items.id}
                    className={({ isActive }) =>
                      `flex items-center  space-x-2 font-medium transition-all duration-300 px-4 py-2 rounded-xl relative ${isActive ? 'text-[#D74552]' : 'text-white'}
                      }`
                    }
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{items.display}</span>
                  </NavLink>
                )
              })
            }
          </nav>

          <div className='hidden lg:flex items-center space-x-3'>
            <Button onClick={onBookAppointment} styles={'bg-[#D74552] text-white'}>
              Book Appointment
            </Button>
          </div>

          {/* mobile menu  */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110">
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {
          isOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl -mx-4 px-4">
              <nav className="space-y-2">
                {
                  navMenu.map((items) => {
                    const IconComponent = items.icon;

                    return (
                      <NavLink onClick={() => setIsOpen(false)}
                        to={items.path}
                        key={items.id}
                        className={({ isActive }) =>
                          `w-full flex items-center space-x-3 font-medium transition-all duration-300 px-4 py-3 rounded-xl ${isActive
                            ? 'text-[#D74552] bg-red-50'
                            : 'text-gray-700 hover:text-[#D74552] hover:bg-red-50/50'
                          }`
                        }
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{items.display}</span>
                      </NavLink>
                    )
                  })
                }
              </nav>

              <div className="mt-4 space-y-3">
                <Button onClick={onBookAppointment} styles={'w-full bg-[#D74552] text-white hover:bg-opacity-90'}>
                  Book Appointment
                </Button>
              </div>


            </div>


          )
        }
      </div>
    </header>
  )
}

export default Header