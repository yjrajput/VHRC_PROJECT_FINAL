import React from "react";
import { getServices } from "../../API/api";
import { useApiData } from "../../hooks/useApiData";
import {
  Heart,
  Brain,
  Eye,
  Baby,
  Bone,
  Stethoscope,
  Activity,
  Pill,
  ArrowRight,
} from "lucide-react";

const ServiceCard = () => {
  const { data: services, loading } = useApiData("vhrc_services", getServices, []);

  const iconMap = {
    Heart,
    Brain,
    Eye,
    Baby,
    Bone,
    Stethoscope,
    Activity,
    Pill,
  };


  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((items) => {
        const IconComponent = iconMap[items.icon];

        return (
          <div
            key={items._id}
            tabIndex={0}
            className="
              group cursor-pointer
              bg-white rounded-2xl border-0 shadow-lg
              transition-all duration-300

              hover:shadow-2xl hover:-translate-y-2
              active:shadow-2xl active:-translate-y-2
              focus-within:shadow-2xl focus-within:-translate-y-2
            "
          >
            <div className="p-6">
              <div className="space-y-4">
                {/* Icon */}
                <div
                  className="
                    w-16 h-16 rounded-xl
                    bg-red-50 text-[#D74552]
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:bg-[#D74552] group-hover:text-white
                    group-active:bg-[#D74552] group-active:text-white
                    group-focus-within:bg-[#D74552] group-focus-within:text-white
                  "
                >
                  {IconComponent && <IconComponent className="w-8 h-8 transition-colors duration-300" />}
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h3
                    className="
                      text-xl font-bold text-gray-900
                      transition-colors

                      group-hover:text-[#D74552]
                      group-active:text-[#D74552]
                      group-focus-within:text-[#D74552]
                    "
                  >
                    {items.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {items.description}
                  </p>
                </div>

                {/* Learn more */}
                <div
                  className="
                    flex items-center text-[#D74552]
                    opacity-0 transition-opacity duration-300

                    group-hover:opacity-100
                    group-active:opacity-100
                    group-focus-within:opacity-100
                  "
                >
                  <span className="text-sm font-medium mr-2">
                    Learn More
                  </span>
                  <ArrowRight
                    className="
                      w-4 h-4 transition-transform duration-300
                      group-hover:translate-x-1
                      group-active:translate-x-1
                      group-focus-within:translate-x-1
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceCard;
