import {
  Phone,
  Ambulance,
  Mail,
  MessageCircle,
  MapPin,
  Car,
  Navigation,
  Clock,
} from "lucide-react";
import Button from "../../ui/Button";
import { UseCustomContext } from "../../context/Contex";

const Contact = () => {

    const { handlePhoneClick, handleEmailClick, handleEmergencyCall,handleDirections, handleLiveChat} = UseCustomContext();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-50 text-[#D74552] px-4 py-2 rounded-full mb-4">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Contact Us</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you with any questions or concerns. Reach out to
            us through any of the convenient methods below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow rounded-lg">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#D74552]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Main Line</h3>
                      <p className="text-sm text-gray-600">
                        General inquiries & appointments
                      </p>
                    </div>
                  </div>

                  <Button onClick={handlePhoneClick} styles={"w-full bg-[#D74552] text-white hover:bg-opacity-95"}>
                    Call +91 9926009520
                  </Button>
                </div>
              </div>
            </div>

            <div className="shadow-lg border-0 bg-red-50 hover:shadow-xl transition-shadow border-red-200">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <Ambulance className="w-6 h-6 text-[#D74552]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Emergency</h3>
                      <p className="text-sm text-gray-600">
                        24/7 Emergency services
                      </p>
                    </div>
                  </div>

                  <Button onClick={handleEmergencyCall} styles={"w-full bg-[#D74552] text-white hover:bg-opacity-95"}>
                    Call +91 7688009300
                  </Button>
                </div>
              </div>
            </div>

            <div className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow rounded-lg">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#D74552]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Email Us</h3>
                      <p className="text-sm text-gray-600">
                        General information
                      </p>
                    </div>
                  </div>

                  <Button onClick={handleEmailClick} styles={"w-full bg-[#193151] text-white hover:bg-opacity-95"}>
                    Send Email
                  </Button>
                </div>
              </div>
            </div>

            <div className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow rounded-lg">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-[#D74552]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Live Chat</h3>
                      <p className="text-sm text-gray-600">
                        Instant support available
                      </p>
                    </div>
                  </div>

                  <Button onClick={handleLiveChat} styles={"w-full bg-[#193151] text-white hover:bg-opacity-95"}>
                    Call (555) 123-4567
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="shadow-lg border-0 bg-white">
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#D74552]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Our Location
                      </h3>
                      <p className="text-gray-600">
                        Easy to find, convenient parking available
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Address
                        </h4>
                        <p className="text-gray-600">
                          123 Healthcare Avenue
                          <br />
                          Medical City, MC 12345
                          <br />
                          United States
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-[#D74552]">
                        <Car className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          Free parking available
                        </span>
                      </div>

                      <Button onClick={handleDirections}
                        styles={
                          "w-full bg-[#D74552] text-white hover:bg-opacity-95 flex items-center justify-center"
                        }
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Operating Hours</span>
                        </h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Monday - Friday:</span>
                            <span className="font-medium">
                              8:00 AM - 8:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday:</span>
                            <span className="font-medium">
                              9:00 AM - 5:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday:</span>
                            <span className="font-medium">
                              10:00 AM - 4:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200">
                            <span className="text-[#D74552] font-semibold">Emergency:</span>
                            <span className="font-bold text-[#D74552]">
                              24/7
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shadow-lg border-0 bg-white">
              <div className="p-0">
                <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-[#D74552] rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Healthcare Hub
                        </h3>
                        <p className="text-gray-600">123 Healthcare Avenue</p>
                        <Button onClick={handleDirections}
                          styles={
                            "mt-4 bg-[#D74552] text-white hover:bg-opacity-95 transition-colors inline-flex items-center space-x-2"
                          }
                        >
                          <Navigation className="w-4 h-4" />
                          <span>View on Map</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
