import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';
import { ArrowRight, Eye, Search, Loader2 } from 'lucide-react';
import Loader from './Loader';
import useAxios from '../Hooks/useAxios';

const ServicesCard = () => {
  const [services, setServices] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false); // 👈 new state for search loader
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // 🔄 show correct loader depending on search
        if (searchTerm) setSearchLoading(true);
        else setLoader(true);

        let url = searchTerm
          ? `/services/search?q=${encodeURIComponent(searchTerm)}`
          : '/home-services';

        const res = await axiosInstance.get(url);
        setServices(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoader(false);
        setSearchLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchServices, 500); // ⏳ debounce typing
    return () => clearTimeout(delayDebounce);
  }, [axiosInstance, searchTerm]);

  if (loader && !searchTerm) return <Loader />;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-purple-100 my-10 to-pink-50 rounded-xl">
      {/* Header + Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          Our Premium Services
        </h1>

        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 border-2 border-purple-400 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-gray-400"
          />

          {/* 🔍 search icon or loader */}
          {searchLoading ? (
            <Loader2 className="absolute right-4 top-3 w-5 h-5 text-purple-500 animate-spin" />
          ) : (
            <Search className="absolute right-4 top-3 text-purple-500 w-5 h-5" />
          )}
        </div>
      </motion.div>

      {/* Services Grid */}
      {services.length === 0 && !searchLoading ? (
        <p className="text-center text-gray-600 mt-10 text-lg">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <motion.div
              key={service._id}
              whileHover={{ scale: 1.03, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {service.name}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">${service.price}</span>
                  <NavLink
                    to={`/service/${service._id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-xl font-semibold"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </NavLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <NavLink
          to="/services"
          className="inline-flex items-center gap-3 bg-white text-purple-600 hover:text-white border-2 border-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 group"
        >
          <span>Explore All Services</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </NavLink>
      </motion.div>
    </section>
  );
};

export default ServicesCard;
