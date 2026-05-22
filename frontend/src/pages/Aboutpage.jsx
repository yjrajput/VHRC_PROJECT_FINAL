import React from 'react'
import {Heart, Target, Eye,CheckCircle, Award, Star, Users, Shield} from 'lucide-react'
const Aboutpage = () => {

  const achievements = [
  {
    icon: Award,
    title: "JCI Accredited",
    description: "International quality and safety standards",
    color: "text-[#D74552] bg-red-50"
  },
  {
    icon: Star,
    title: "5-Star Rating",
    description: "Consistently rated among the top hospitals",
    color: "text-[#193151] bg-red-50/50"
  },
  {
    icon: Users,
    title: "50,000+ Patients",
    description: "Served annually with excellence",
    color: "text-[#D74552] bg-red-50"
  },
  {
    icon: Shield,
    title: "ISO 9001:2015",
    description: "Quality management certification",
    color: "text-[#193151] bg-red-50/50"
  }
];

const milestones = [
  {
    year: "1998",
    title: "Hospital Founded",
    description: "HealthCare Hub was established with a vision to provide world-class healthcare to the community."
  },
  {
    year: "2005",
    title: "First Expansion",
    description: "Added specialized cardiac and neurological departments with state-of-the-art equipment."
  },
  {
    year: "2012",
    title: "JCI Accreditation",
    description: "Achieved international recognition for quality and safety standards."
  },
  {
    year: "2018",
    title: "Technology Integration",
    description: "Implemented advanced digital health systems and robotic surgery capabilities."
  },
  {
    year: "2023",
    title: "Sustainability Initiative",
    description: "Became the first carbon-neutral hospital in the region."
  }
];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#193151] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">About HealthCare Hub</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              25 Years of Excellence in Healthcare
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
               Since 1998, HealthCare Hub has been at the forefront of medical innovation, 
                providing compassionate care and advanced treatments to our community. 
                We're committed to improving lives through exceptional healthcare.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on principles of excellence, compassion, and innovation
            </p>
          </div>


          <div className="grid lg:grid-cols-3 gap-8">
            <div className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow rounded-lg">
                <div className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mx-auto">
                        <Target className="w-8 h-8 text-[#D74552]" />
                    </div>
                    <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide exceptional, compassionate healthcare services that improve the 
                    health and well-being of our community through clinical excellence, 
                    innovative treatments, and personalized care.
                  </p>
                </div>
                </div>
            </div>

            <div className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow rounded-lg">
                <div className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mx-auto">
                        <Eye className="w-8 h-8 text-[#D74552]" />
                    </div>
                    <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the leading healthcare provider in the region, recognized for our 
                    commitment to patient safety, clinical excellence, and innovative care 
                    that sets the standard for modern medicine.
                  </p>
                </div>
                </div>
            </div>

            <div className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow rounded-lg">
                <div className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mx-auto">
                        <Heart className="w-8 h-8 text-[#D74552]" />
                    </div>
                    <div className="space-y-2 text-left">
                  {["Compassion", "Excellence", "Integrity", "Innovation", "Respect"].map((value, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#D74552] flex-shrink-0" />
                        <span className="text-gray-700">{value}</span>
                      </div>
                    ))}
                </div>
                </div>
            </div>
            
          </div>
        </div>
      </section>


      <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Recognized Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality has earned us prestigious awards and certifications
            </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              
              return (
                <div key={index} className="text-center shadow-lg border-0 bg-white hover:shadow-xl transition-shadow rounded-lg">
                  <div className="p-6 space-y-4">
                    <div className={`w-16 h-16 rounded-xl ${achievement.color} flex items-center justify-center mx-auto`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
      </section>


      <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our commitment to advancing healthcare
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-100 hidden lg:block"></div>

            <div className="space-y-8 lg:space-y-12">
              {
                milestones.map((milestone, index) =>(
                  <div key={index} className={`flex flex-col lg:flex-row items-stretch lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`w-full lg:flex-1 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <div className="shadow-lg border-0 bg-white rounded-2xl">
                      <div className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span className="bg-[#D74552] text-white px-3 py-1 rounded-full font-bold">
                              {milestone.year}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="hidden lg:block w-4 h-4 bg-[#D74552] rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="hidden lg:block lg:flex-1"></div>
                  </div>
                ))
              }
            </div>
          </div>
            </div>
      </section>
    </div>
  )
}

export default Aboutpage