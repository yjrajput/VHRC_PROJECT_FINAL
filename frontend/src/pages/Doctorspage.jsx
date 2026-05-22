import React from 'react'
import { Users, Search, Filter } from 'lucide-react'
import { UseCustomContext } from '../context/Contex';
import { getDoctors } from '../API/api';
import { useApiData } from '../hooks/useApiData';
import DoctorsCard from '../components/doctors/DoctorsCard';

const Doctorspage = () => {
  const departments = [
    "All Departments",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Ophthalmology",
    "Internal Medicine",
  ];

  const { selectedDepartment, setSelectedDepartment, searchTerm, setSearchTerm } = UseCustomContext();
  const { data: doctors, loading } = useApiData('vhrc_doctors', getDoctors, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      doctor.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#193151] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Our Medical Team</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Meet Our Expert Doctors
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our team of board-certified physicians and specialists bring decades of experience 
              and cutting-edge expertise to provide you with exceptional healthcare.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="w-full md:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search doctors by name or specialty..." className="pl-10 pr-4 py-3 w-full outline-none bg-gray-200 rounded-lg border-gray-300 focus:border-[#193151]" />
              </div>
            </div>

            <div className="flex flex-row items-center gap-3 w-full md:w-auto">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="flex-1 md:w-48 border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#193151] bg-white"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </div>
        </div>
      </section>

      <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                    <div className="h-64 bg-gray-200"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor) => (
                  <DoctorsCard key={doctor._id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
      </section>
    </div>
  )
}

export default Doctorspage