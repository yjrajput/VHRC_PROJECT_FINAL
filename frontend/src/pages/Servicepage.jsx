import { Stethoscope, Calendar, Activity, Clock, Shield, Award, Users, Heart, Brain, Eye, Baby, Bone, CheckCircle, Star, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { getServiceDetails } from "../API/api";
import { useApiData } from "../hooks/useApiData";
import { UseCustomContext } from "../context/Contex";

const Servicepage = () => {
  const ICON_MAP = { Heart, Brain, Eye, Baby, Bone, Stethoscope };
  const { onBookAppointment } = UseCustomContext();
  const { data: serviceDetails, loading } = useApiData("vhrc_service_details", getServiceDetails, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#193151] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full">
              <Stethoscope className="w-4 h-4" />
              <span className="text-sm font-medium">Medical Services</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">Comprehensive Healthcare Services</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our full range of medical specialties and advanced treatments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button onClick={onBookAppointment} styles="bg-[#D74552] flex items-center justify-center text-lg shadow-lg">
                <Calendar className="w-5 h-5 mr-2" />Book Appointment
              </Button>
              <Button onClick={() => console.log("Emergency clicked")} styles="bg-transparent border-2 border-white/20 hover:bg-white hover:text-[#193151] justify-center flex items-center text-lg shadow-lg">
                <Activity className="w-5 h-5 mr-2" />Emergency Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-8">
            {[
              { icon: Users, color: "bg-red-50 text-[#D74552]", val: "50+", label: "Medical Specialties" },
              { icon: Award, color: "bg-red-50 text-[#D74552]", val: "200+", label: "Board-Certified Physicians" },
              { icon: Shield, color: "bg-red-50 text-[#D74552]", val: "25+", label: "Years of Excellence" },
              { icon: Clock, color: "bg-red-50 text-[#D74552]", val: "24/7", label: "Emergency Care" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 ${s.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <s.icon className="w-8 h-8" />
                </div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Medical Specialties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each of our departments combines clinical excellence with compassionate care.
            </p>
          </div>

          {loading ? (
            <div className="space-y-12">{[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white shadow-xl rounded-lg overflow-hidden animate-pulse">
                <div className="grid lg:grid-cols-2 gap-8"><div className="h-80 bg-gray-200"></div>
                  <div className="p-8 space-y-4"><div className="h-8 bg-gray-200 rounded w-1/2"></div><div className="h-4 bg-gray-200 rounded w-full"></div></div>
                </div></div>
            ))}</div>
          ) : (
            <div className="space-y-12">
              {serviceDetails.map((service, index) => {
                const Icon = ICON_MAP[service.icon];
                const isEven = index % 2 === 0;
                return (
                  <div key={service._id} className="shadow-xl border-0 bg-white overflow-hidden">
                    <div className={`grid lg:grid-cols-2 gap-8 items-center ${!isEven ? "lg:grid-flow-col-dense" : ""}`}>
                      <div className={`relative ${!isEven ? "lg:col-start-2" : ""}`}>
                        <img className="w-full h-80 lg:h-96 object-cover" src={service.image} alt={service.title} />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div><div className="text-2xl font-bold text-gray-900">{service.specialists}</div><div className="text-xs text-gray-600">Specialists</div></div>
                              <div><div className="text-2xl font-bold text-gray-900">{service.yearsExperience}</div><div className="text-xs text-gray-600">Years Exp</div></div>
                              <div><span className={`text-xs px-2 rounded-lg ${service.emergencyAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-200'}`}>{service.emergencyAvailable ? '24/7' : 'Scheduled'}</span><div className="text-xs text-gray-600 mt-1">Availability</div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-8 space-y-6 ${!isEven ? 'lg:col-start-1' : ''}`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center`}>{Icon && <Icon className="w-8 h-8" />}</div>
                          <div><h3 className="text-2xl font-bold text-gray-900">{service.title}</h3><p className="text-gray-600">{service.description}</p></div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-bold text-gray-900">Key Procedures</h4>
                          <div className="grid grid-cols-2 gap-2">{service.procedures.map((p, i) => (
                            <div key={i} className="flex items-center space-x-2"><CheckCircle className="w-4 h-4 text-[#D74552] flex-shrink-0" /><span className="text-sm text-gray-700">{p}</span></div>
                          ))}</div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-bold text-gray-900">Features</h4>
                          <div className="space-y-2">{service.features.slice(0, 3).map((f, i) => (
                            <div key={i} className="flex items-center space-x-2"><Star className="w-4 h-4 text-yellow-500 flex-shrink-0" /><span className="text-sm text-gray-700">{f}</span></div>
                          ))}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button onClick={onBookAppointment} styles="bg-[#D74552] flex items-center justify-center flex-1"><Calendar className="w-4 h-4 mr-2" />Book Appointment</Button>
                          <button className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-lg transition-colors font-medium flex-1 cursor-pointer"><span>Learn More</span><ArrowRight className="w-4 h-4" /></button>
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

export default Servicepage;
