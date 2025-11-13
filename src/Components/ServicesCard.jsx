import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';
import { ArrowRight, Star, Clock, MapPin, Eye } from 'lucide-react';
import Loader from './Loader';

const ServicesCard = () => {
    const [services, setServices] = useState([]);
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get('http://localhost:5000/home-services');
                setServices(res.data.data.slice(0, 6));
            } catch (err) {
                console.error("Failed to fetch services:", err);
            }
        };
        fetchServices();
    }, []);
    
   

    return (
        <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-purple-100 my-10 to-pink-50 rounded-xl">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Our Premium Services
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover top-quality services tailored to meet your needs with expert professionals
                </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {services.map((service, index) => (
                    <motion.div
                        key={service._id}
                        whileHover={{
                            scale: 1.03,
                            y: -5
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                    >
                        {/* Image Container */}
                        <div className="relative overflow-hidden">
                            <img
                                src={service.image || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                alt={service.title}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                                    {service.category || 'Service'}
                                </span>
                            </div>

                            {/* Rating Badge */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-bold text-gray-800">{service.rating || '4.5'}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                {service.title}
                            </h2>

                            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                {service.description || 'Professional service with quality guarantee and customer satisfaction.'}
                            </p>

                            {/* Service Meta */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{service.duration || '2h'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{service.location || 'Remote'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price and Button */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-purple-600">${service.price || 0}</span>
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

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
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