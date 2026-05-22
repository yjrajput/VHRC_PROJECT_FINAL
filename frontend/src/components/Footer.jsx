import {
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Calendar,
  Star,
  Award,
  Shield,
  Users,
  ChevronRight,
  Download,
  Globe,
  CreditCard,
  Headphones,
  FileText,
  Stethoscope,
  Building,
  ArrowUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";


const Footer = () => {
  const [scroll, setScroll] = useState(false);
  const navigation = useNavigate()

  const handleSocialClick = (platform) => {
    const urls = {
      facebook: '#',
      twitter: '#',
      instagram: 'https://www.instagram.com/yuvrajjj_rathore?igsh=dGZ3cTE2Z2JmNnho',
      linkedin: '#',
      youtube: '#'
    };
    window.open(urls[platform], '_blank');
  };


  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickLinks = [
    { name: 'About Us', path: '/about', icon: Building },
    { name: 'Our Services', path: '/services', icon: Stethoscope },
    { name: 'Find a Doctor', path: '/doctors', icon: Users },
    { name: 'Appointments', path: '/', icon: Calendar },
    { name: 'Careers', path: '/', icon: Star },
    { name: 'News & Events', path: '/', icon: Globe }
  ];

  const services = [
    { name: 'Emergency Care', available: '24/7' },
    { name: 'Cardiology', available: 'Mon-Fri' },
    { name: 'Neurology', available: 'Mon-Fri' },
    { name: 'Pediatrics', available: '24/7' },
    { name: 'Orthopedics', available: 'Mon-Sat' },
    { name: 'Radiology', available: 'Daily' }
  ];

  const patientResources = [
    { name: 'Patient Rights', icon: FileText },
    { name: 'Billing & Insurance', icon: CreditCard },
    { name: 'Medical Records', icon: Download },
    { name: 'Visitor Information', icon: Users },
    { name: 'Financial Assistance', icon: Headphones },
    { name: 'Patient Safety', icon: Shield }
  ];
  return (
    <footer className="bg-gradient-to-br from-[#0c1829] via-[#11243c] to-[#193151] text-white relative overflow-hidden border-t border-gray-800">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-500 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0  relative z-10">
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12 pt-10">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center text-4xl font-black italic tracking-tighter">
                <span className="text-blue-300">V</span>
                <span className="text-[#D74552] text-5xl mx-[-3px]">+</span>
                <span className="text-blue-300">RC</span>
              </div>
              <div className="flex flex-col justify-center leading-none text-left">
                <span className="text-blue-300 text-xl font-bold tracking-tight">Vijaylaxmi Hospital</span>
                <span className="text-[#D74552] text-xs font-bold tracking-wide mt-1">And Research Center</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Leading the healthcare services in Nimaad region, cutting-edge technology,
              and a commitment to improving lives in our community and beyond.
            </p>

            {/* Awards & Certifications */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-900/50 rounded-xl backdrop-blur-sm">
                <Award className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                <p className="text-xs text-gray-300">JCI Accredited</p>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded-xl backdrop-blur-sm">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                <p className="text-xs text-gray-300">5-Star Rating</p>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded-xl backdrop-blur-sm">
                <Shield className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-gray-300">ISO Certified</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h5 className="font-bold text-lg">Connect With Us</h5>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, name: 'facebook', color: 'hover:bg-blue-600' },
                  { icon: Twitter, name: 'twitter', color: 'hover:bg-sky-500' },
                  { icon: Instagram, name: 'instagram', color: 'hover:bg-pink-600' },
                  { icon: Linkedin, name: 'linkedin', color: 'hover:bg-blue-700' },
                  { icon: Youtube, name: 'youtube', color: 'hover:bg-red-600' }
                ].map(({ icon: Icon, name, color }) => (
                  <button
                    key={name}
                    onClick={() => handleSocialClick(name)}
                    className={`w-12 h-12 bg-gray-900/50 ${color} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm cursor-pointer`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold flex items-center space-x-2">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => navigation(link.path)}
                      className="flex cursor-pointer items-center space-x-3 text-gray-300 hover:text-[#D74552] transition-all duration-300 hover:translate-x-2 group"
                    >
                      <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{link.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold flex items-center space-x-2">
              <Stethoscope className="w-5 h-5 text-green-400" />
              <span>Our Services</span>
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => navigation(service.name)}
                    className="flex cursor-pointer justify-between items-center w-full text-gray-300 hover:text-[#D74552] transition-all duration-300 hover:translate-x-2 group"
                  >
                    <span className="group-hover:font-medium">{service.name}</span>
                    <span className="text-xs bg-[#D74552]/20 text-[#D74552] px-2 py-1 rounded-full">
                      {service.available}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Resources */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>Patient Resources</span>
            </h4>
            <ul className="space-y-3">
              {patientResources.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <li key={resource.name}>
                    <button
                      onClick={() => navigation(resource.name)}
                      className="flex cursor-pointer items-center space-x-3 text-gray-300 hover:text-[#D74552] transition-all duration-300 hover:translate-x-2 group"
                    >
                      <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{resource.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>






      </div>

      {/* Scroll to Top Button */}
      {scroll && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-2 sm:right-8  w-12 h-12 bg-[#D74552] 
               hover:bg-opacity-90 text-white rounded-full shadow-lg 
               hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex 
               items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  )
}

export default Footer