import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAxios from '../Hooks/useAxios';

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const axiosInstance = useAxios(); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get('/services');
        const services = res.data.data.slice(0, 6);

        const reviewsData = services.map((service) => ({
          id: service._id,
          providerName: service.providerName || "Anonymous",
          email: service.email || "unknown@example.com",
          rating: Math.floor(Math.random() * 2) + 4, 
          feedback: service.description || "Great service!",
        }));

        setReviews(reviewsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="bg-gray-100 py-12 overflow-hidden rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h2>

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 60,  
          ease: "linear",
        }}
      >
        {reviews.concat(reviews).map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md min-w-[250px] flex-shrink-0"
          >
            <h3 className="text-xl font-semibold mb-2">{review.providerName}</h3>
            <p className="text-gray-500 mb-3">{review.email}</p>
            <div className="flex items-center mb-3">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
              {Array.from({ length: 5 - review.rating }).map((_, i) => (
                <span key={i} className="text-gray-300">★</span>
              ))}
            </div>
            <p className="text-gray-700">{review.feedback}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;