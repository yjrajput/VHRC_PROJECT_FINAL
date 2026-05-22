import { Star, MapPin, Calendar } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { UseCustomContext } from "../../context/Contex";
import { getImageUrl } from "../../API/api";

const DoctorsCard = ({ doctor }) => {
  const navigate = useNavigate();

  const {
    _id,
    name,
    specialty,
    image,
    experience,
    rating,
    reviews,
    education,
    specialties,
    location,
    availability,
  } = doctor;

  const { onBookAppointment } = UseCustomContext();

  return (
    <div className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white overflow-hidden rounded-lg">
      <div className="p-0">
        <div className="relative overflow-hidden" onClick={() => navigate(`/doctors/${_id}`)}>
          <img
            src={getImageUrl(image)}
            alt={name}
            loading="lazy"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* rating */}
          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-bold text-gray-900">{rating}</span>
            </div>
          </div>

          {/* experience  */}
          <div className="absolute top-4 left-4 bg-[#D74552] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {experience}
          </div>
        </div>

        {/* information */}
        <div className="p-6 space-y-4">
          <div className="space-y-2 cursor-pointer" onClick={() => navigate(`/doctors/${_id}`)}>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#D74552] transition-colors">
              {name}
            </h3>
            <p className="text-[#D74552] font-semibold">{specialty}</p>
            <p className="text-sm text-gray-600">{education}</p>
          </div>

          {/* specialized */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Specialties:</p>
            <div className="flex flex-wrap gap-1">
              {specialties?.slice(0, 2).map((specialty, index) => (
                <div
                  key={index}
                  className="text-xs px-2 rounded-lg py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {specialty}
                </div>
              ))}
              {specialties?.length > 2 && (
                <div className="text-xs px-2 py-.5 rounded-lg bg-gray-100 text-gray-700">
                  +{specialties.length - 2} more
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{availability}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>
                {rating} ({reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button styles={"bg-[#D74552] hover:bg-opacity-95 text-white w-full shadow-md font-semibold"} onClick={onBookAppointment}>
              Book Appointment
            </Button>

            <Button styles={"bg-[#193151] border-2 border-[#193151] text-white hover:bg-opacity-90 w-full font-semibold transition-all duration-300"} onClick={() => navigate(`/doctors/${_id}`)}>
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsCard;
