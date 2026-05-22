import React from 'react'
import { Play, Award, Users, Clock } from "lucide-react";
import Button from '../ui/Button'
import { UseCustomContext } from '../context/Contex';
const Hero = () => {

    const handleWatchVideo = () =>{
        console.log('Watch video clicked');
    }

    const {onBookAppointment} = UseCustomContext()
  return (
    <section className="relative bg-[#193151] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div  className="space-y-4">
                        <div className="inline-flex items-center space-x-2 bg-[#D74552] text-white px-4 py-1 rounded-full">
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-medium">KHARGONE'S PREMIER HEALTHCARE CENTRE</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            <span className='text-white'>Your Health is Our</span>
                            <span className="text-[#D74552]"> Priority</span>
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Vijaylaxmi Hospital & Research Centre provides advanced, compassionate medical care to Khargone and all surrounding regions — with specialist doctors, modern equipment, and affordable charges.
                        </p>
                    </div>

                    

                    {/* action button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={onBookAppointment} styles={'bg-[#D74552] text-lg'}>
                            Book Appointment Now
                        </Button>

                        <button
                            onClick={handleWatchVideo}
                            className="flex items-center justify-center space-x-3 bg-white text-gray-700 px-8 py-2 text-lg rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all group"
                        >
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Play className="w-4 h-4 text-blue-600" />
                            </div>
                            <span>Watch Our Story</span>
                        </button>
                    </div>

                    {/* state */}
                    <div className="grid grid-cols-3 gap-4 sm:gap-6">
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold text-blue-300">50K+</div>
                            <div className="text-xs sm:text-sm text-gray-300">Patients Served</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">200+</div>
                            <div className="text-xs sm:text-sm text-gray-300">Medical Experts</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold text-blue-300">24/7</div>
                            <div className="text-xs sm:text-sm text-gray-300">Emergency Care</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 sm:space-x-6 sm:gap-0 pt-6 border-t border-white/10">
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Users className="w-5 h-5 text-emerald-400" />
                            <span className="text-sm">Trusted by thousands</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Clock className="w-5 h-5 text-blue-400" />
                            <span className="text-sm">Same-day appointments</span>
                        </div>
                    </div>
                </div>

                {/* image section  */}
                <div className="relative ">
                    <div className="relative z-10">
                        <figure>
                            <img src="https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D" alt="doctors-image" className="w-full h-90 lg:h-[500px] object-cover rounded-2xl shadow-2xl"/>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero