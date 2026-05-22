import React from 'react'
import {Stethoscope, ArrowRight} from 'lucide-react'
import ServiceCard from './ServiceCard';
import Button from '../../ui/Button';
import {useNavigate} from 'react-router-dom'

const Services = () => {
    const navigate = useNavigate()
    
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-red-50 text-[#D74552] px-4 py-2 rounded-full mb-4">
                        <Stethoscope className="w-4 h-4" />
                        <span className="text-sm font-medium">Our Services</span>
                    </div>

                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Comprehensive Healthcare Services
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From routine checkups to specialized treatments, we offer a full range of medical services 
                        with state-of-the-art technology and compassionate care.
                    </p>
                </div>


                {/* service card section  */}
                <ServiceCard />

                {/* action button */}
                <div className="text-center mt-16">
                    <Button onClick={() => navigate('/services')} styles={'inline-flex items-center space-x-2 bg-[#D74552] hover:bg-opacity-95 text-white font-semibold shadow-lg'}>
                        <span>View All Services</span>
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Services