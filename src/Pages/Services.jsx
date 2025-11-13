import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, Eye } from "lucide-react";
import { NavLink } from "react-router";
import ErrorPage from "./ErrorPage";
import Loader from "../Components/Loader";
import useAxios from "../Hooks/useAxios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const useAxiosInstance = useAxios(); 

  useEffect(() => {
    const fetchServices = async () => {
      try {
        //  Use your
        const res = await useAxiosInstance.get("/services");

        
        const data = res.data;
        const servicesArray = Array.isArray(data)
          ? data
          : data.services || data.data || [];

        setServices(servicesArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [useAxiosInstance]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <section className="py-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-12 text-gray-800"
        >
          Our Services
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              whileHover={{ scale: 1.03, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={
                    service.image ||
                    "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {service.category || "Service"}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-bold text-gray-800">
                    {service.rating || "4.5"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {service.description ||
                    "Professional service with quality guarantee and customer satisfaction."}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration || "2h"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{service.location || "Remote"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-purple-600">
                      ${service.price || 0}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/service</span>
                  </div>
                  <NavLink
                    to={`/service/${service._id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </NavLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
