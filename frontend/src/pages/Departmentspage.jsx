import { Shield, Calendar, Activity, Users, Award, Clock, CheckCircle, Star, Phone, MapPin, ArrowRight, Heart, Brain, Baby, Bone, Stethoscope, Eye } from "lucide-react";
import Button from "../ui/Button";
import { UseCustomContext } from "../context/Contex";
import { getDepartments } from "../API/api";
import { useApiData } from "../hooks/useApiData";

const Departmentspage = () => {
  const { onBookAppointment, handleEmergencyCall } = UseCustomContext();
  const { data: departments, loading } = useApiData("vhrc_departments", getDepartments, []);
  const ICON_MAP = { Activity, Heart, Brain, Baby, Bone, Stethoscope, Eye };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#193151] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" /><span className="text-sm font-medium">Medical Departments</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">Our Medical Departments</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of medical departments, each staffed with expert physicians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button onClick={onBookAppointment} styles="bg-[#D74552] text-white flex items-center justify-center text-lg rounded-xl shadow-lg">
                <Calendar className="w-5 h-5 mr-2" />Book Appointment
              </Button>
              <Button onClick={handleEmergencyCall} styles="bg-transparent border-2 border-white/20 hover:bg-white hover:text-[#193151] text-white text-lg rounded-xl shadow-lg flex items-center justify-center">
                <Activity className="w-5 h-5 mr-2" />Emergency Care
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, color: "bg-red-50 text-[#D74552]", val: "25+", label: "Medical Departments" },
              { icon: Users, color: "bg-red-50 text-[#D74552]", val: "200+", label: "Medical Specialists" },
              { icon: Award, color: "bg-red-50 text-[#D74552]", val: "JCI", label: "Accredited" },
              { icon: Clock, color: "bg-red-50 text-[#D74552]", val: "24/7", label: "Emergency Care" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 ${s.color} rounded-xl flex items-center justify-center mx-auto mb-4`}><s.icon className="w-8 h-8" /></div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{s.val}</div>
                <div className="text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Departments</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Each department provides specialized care with dedicated teams.</p>
          </div>

          {loading ? (
            <div className="space-y-12">{[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white shadow-xl rounded-lg overflow-hidden animate-pulse">
                <div className="grid lg:grid-cols-3"><div className="h-80 bg-gray-200"></div>
                  <div className="lg:col-span-2 p-8 space-y-4"><div className="h-8 bg-gray-200 rounded w-1/2"></div><div className="h-4 bg-gray-200 rounded w-full"></div></div>
                </div></div>
            ))}</div>
          ) : (
            <div className="space-y-12">
              {departments.map((dept, index) => {
                const Icon = ICON_MAP[dept.icon];
                const isEven = index % 2 === 0;
                return (
                  <div key={dept._id} className="shadow-xl border-0 bg-white overflow-hidden rounded-lg">
                    <div className={`grid lg:grid-cols-3 gap-0 ${!isEven ? "lg:grid-flow-col-dense" : ""}`}>
                      <div className={`relative lg:col-span-1 ${!isEven ? "lg:col-start-3" : ""}`}>
                        <figure className="h-[95%]">
                          <img src={dept.image} alt={dept.name} className="w-full h-80 lg:h-full object-cover min-h-96" />
                          <div className="absolute top-6 left-6">
                            <div className={`w-16 h-16 rounded-xl ${dept.color} flex items-center justify-center shadow-lg`}>
                              {Icon && <Icon className="w-8 h-8" />}
                            </div>
                          </div>
                        </figure>
                      </div>
                      <div className={`lg:col-span-2 p-8 space-y-6 ${!isEven ? 'lg:col-start-1 lg:col-span-2' : ''}`}>
                        <div className="space-y-4">
                          <div><h3 className="text-3xl font-bold text-gray-900 mb-2">{dept.name}</h3><p className="text-gray-600 text-lg">{dept.description}</p></div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                            <div className="text-center"><div className="text-2xl font-bold text-[#193151]">{dept.stats.patients}</div><div className="text-xs text-gray-600">Annual Patients</div></div>
                            <div className="text-center"><div className="text-2xl font-bold text-[#D74552]">{dept.stats.response}</div><div className="text-xs text-gray-600">Response Time</div></div>
                            <div className="text-center"><div className="text-2xl font-bold text-[#193151]">{dept.stats.staff}</div><div className="text-xs text-gray-600">Medical Staff</div></div>
                            <div className="text-center"><div className="text-2xl font-bold text-[#D74552]">{dept.stats.availability}</div><div className="text-xs text-gray-600">Availability</div></div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-bold text-gray-900 flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500" /><span>Key Services</span></h4>
                            <div className="space-y-2">{dept.services.map((s, i) => (
                              <div key={i} className="flex items-center space-x-2"><div className="w-2 h-2 bg-[#D74552] rounded-full flex-shrink-0"></div><span className="text-sm text-gray-700">{s}</span></div>
                            ))}</div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-bold text-gray-900 flex items-center space-x-2"><Star className="w-5 h-5 text-yellow-500" /><span>Facilities</span></h4>
                            <div className="space-y-2">{dept.facilities.map((f, i) => (
                              <div key={i} className="flex items-center space-x-2"><div className="w-2 h-2 bg-[#193151] rounded-full flex-shrink-0"></div><span className="text-sm text-gray-700">{f}</span></div>
                            ))}</div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                          <h4 className="font-bold text-gray-900">Department Contact</h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2"><Phone className="w-4 h-4 text-[#D74552]" /><span className="text-[#D74552] font-semibold">{dept.contactInfo.phone}</span></div>
                              <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-[#193151]" /><span className="text-gray-700">{dept.contactInfo.location}</span></div>
                            </div>
                            <div className="flex items-center space-x-2"><Users className="w-4 h-4 text-[#193151]" /><span className="text-gray-700">Director: {dept.contactInfo.director}</span></div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button styles="flex items-center justify-center space-x-2 bg-[#D74552] hover:bg-opacity-95 text-white px-6 py-2 rounded-lg transition-colors font-medium flex-1">
                            <Phone className="w-4 h-4" /><span>Call Department</span>
                          </Button>
                          <button className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors font-medium flex-1">
                            <span>Learn More</span><ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Departmentspage;
