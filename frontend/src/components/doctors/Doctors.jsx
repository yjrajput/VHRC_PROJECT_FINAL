
import { getDoctors } from '../../API/api';
import { useApiData } from '../../hooks/useApiData';
import { Award } from 'lucide-react';
import DoctorsCard from './DoctorsCard';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
    const navigate = useNavigate();
    const { data: doctors, loading } = useApiData('vhrc_doctors', getDoctors, []);

  return (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">Our Medical Team</span>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Meet Our Expert Doctors
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our team of board-certified physicians brings decades of experience and 
                    expertise to provide you with the highest quality healthcare.
                </p>
            </div>

            {/* doctors grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                    <div className="h-64 bg-gray-200"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.slice(0, 3).map((doctor) => (
                  <DoctorsCard key={doctor._id} doctor={doctor} />
                ))}
              </div>
            )}
            
            <div className="text-center mt-16">
            <Button onClick={() => navigate('/doctors')} styles={'inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700'}>
                <span>View All Doctors</span>
            <Award className="w-5 h-5" />
            </Button>
            </div>
        </div>
    </section>
  )
}

export default Doctors