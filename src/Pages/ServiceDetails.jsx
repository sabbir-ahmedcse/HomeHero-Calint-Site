import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Clock,
  MapPin,
  Users,
  Calendar,
  Shield,
  CheckCircle,
  ArrowLeft,
  Phone,
  Mail,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";
import { AuthContext } from "../Context/AuthContext";
import useAxios from "../Hooks/useAxios";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    email: "",
    date: "",
    price: "" // price field যোগ করা হয়েছে
  });

  const axiosInstance = useAxios(); // useAxios hook ব্যবহার

  useEffect(() => {
    if (user?.email) {
      setBookingData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axiosInstance.get(`/services/${id}`);
        setService(res.data.data);
        // service লোড হলে price সেট করুন
        if (res.data.data) {
          setBookingData(prev => ({ ...prev, price: res.data.data.price }));
        }
      } catch (err) {
        console.error("Failed to fetch service:", err);
        Swal.fire("Error", "Service not found", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        userEmail: bookingData.email,
        serviceId: service._id,
        serviceName: service.title || service.name, // title না থাকলে name ব্যবহার করুন
        bookingDate: bookingData.date,
        price: bookingData.price || service.price, // editable price ব্যবহার
      };

      const res = await axiosInstance.post("/bookings", payload);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          text: "Your booking has been successfully saved.",
          timer: 2000,
          showConfirmButton: false,
        });
        setShowModal(false);
        setBookingData({ 
          email: user?.email || "", 
          date: "", 
          price: service.price // reset to original price
        });
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  if (loading) return <Loader />;

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Service Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The service you're looking for doesn't exist.
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Services</span>
        </motion.button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={
                  service.image ||
                  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
                }
                alt={service.title || service.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {service.category || "Service"}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {service.title || service.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= Math.floor(service.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-800">
                  {(service.rating || 0).toFixed(1)}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {service.description}
              </p>
              <p className="font-bold text-purple-600 text-2xl">
                ${service.price}
              </p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl sticky top-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-purple-600 mb-2">
                  ${service.price}
                </div>
                <p className="text-gray-600">per service</p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 mb-6"
              >
                Book This Service
              </button>

              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold text-gray-900">
                    {service.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-semibold text-green-600">Today</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Book {service.title || service.name}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Service Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <p className="font-semibold text-gray-900">{service.title || service.name}</p>
                <p className="text-gray-600 text-sm">${service.price}</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={bookingData.email}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Booking Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booking Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, date: e.target.value })
                      }
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Price (editable) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booking Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="price"
                    value={bookingData.price}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, price: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg hover:shadow-purple-500/25"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetails;