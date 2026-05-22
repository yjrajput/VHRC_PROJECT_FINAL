import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Award, Languages, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { getDoctor, getImageUrl } from '../API/api';
import Button from '../ui/Button';
import { UseCustomContext } from '../context/Contex';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onBookAppointment } = UseCustomContext();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const data = await getDoctor(id);
        setDoctor(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch doctor details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#193151] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor Not Found</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={() => navigate('/doctors')} styles="bg-[#D74552] text-white">
          Back to Doctors
        </Button>
      </div>
    );
  }

  const {
    name, specialty, image, experience, rating, reviews, education,
    specialties, location, availability, department, languages, certifications, bio
  } = doctor;

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#D74552] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Profile Overview (Image + Basic Info) */}
          <div className="p-6 sm:p-10 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={getImageUrl(image)}
                alt={name}
                className="w-full md:w-56 h-72 md:h-56 object-cover rounded-2xl shadow-md border-4 border-white"
              />
              <div className="space-y-6 flex-1">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{name}</h1>
                  <p className="text-xl text-[#D74552] font-semibold mt-2">{specialty}</p>
                  <p className="text-gray-500 font-medium mt-1">{department}</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="bg-yellow-50 px-5 py-3 rounded-xl border border-yellow-100 flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                    <div>
                      <div className="font-bold text-yellow-700">{rating} Rating</div>
                      <div className="text-sm text-yellow-600">{reviews} Reviews</div>
                    </div>
                  </div>
                  <div className="bg-red-50/50 px-5 py-3 rounded-xl border border-red-100 flex items-center gap-3">
                    <Award className="w-6 h-6 text-[#D74552]" />
                    <div>
                      <div className="font-bold text-[#193151]">{experience}</div>
                      <div className="text-sm text-gray-600">Experience</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button styles="bg-[#D74552] text-white shadow-md w-full sm:w-auto" onClick={onBookAppointment}>
                    Book Appointment Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="p-6 sm:p-10">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-10">
                {/* About/Bio */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <FileText className="w-5 h-5 text-[#D74552]" />
                    About Doctor
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {bio || "No bio available for this doctor."}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <Award className="w-5 h-5 text-[#D74552]" />
                    Education & Qualifications
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <p className="font-medium text-gray-800">{education}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Expertise / Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {specialties?.map((s, i) => (
                      <span key={i} className="bg-red-50/50 text-[#193151] border border-red-100 px-4 py-2 rounded-xl text-sm font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    Location
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <p className="font-medium text-gray-800">{location}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <Calendar className="w-5 h-5 text-[#D74552]" />
                    Availability
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <p className="font-medium text-gray-800">{availability}</p>
                  </div>
                </div>

                {certifications && certifications.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                      <CheckCircle className="w-5 h-5 text-[#D74552]" />
                      Certifications
                    </h3>
                    <ul className="space-y-3 bg-gray-50 rounded-xl p-5 border border-gray-100">
                      {certifications.map((cert, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-800 font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#D74552] mt-2 flex-shrink-0"></span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {languages && languages.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                      <Languages className="w-5 h-5 text-[#D74552]" />
                      Languages Spoken
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang, i) => (
                        <span key={i} className="bg-red-50/50 text-[#193151] border border-red-100 px-4 py-2 rounded-xl text-sm font-semibold">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
