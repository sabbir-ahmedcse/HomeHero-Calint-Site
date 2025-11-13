import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
// import { useNavigate } from "react-router";

const AddService = () => {
  const { user } = useContext(AuthContext);
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    provider_name: user?.displayName || "",
    provider_email: user?.email || "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Error", "Please login first", "error");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const serviceData = {
        name: formData.name.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        image: formData.image.trim(),
        provider_name: formData.provider_name.trim(),
        provider_email: formData.provider_email.trim(),
        featured: formData.featured,
      };

      const response = await fetch("http://localhost:5000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Service added successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset form
        setFormData({
          name: "",
          category: "",
          price: "",
          description: "",
          image: "",
          provider_name: user?.displayName || "",
          provider_email: user?.email || "",
          featured: false,
        });

        // setTimeout(() => navigate("/my-services"), 2200);
      } else {
        throw new Error(result.message || "Failed to add service");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Failed to add service. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Login Required</h2>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-purple-600 rounded-xl text-white font-bold hover:bg-purple-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            Add New Service
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Professional Cleaning"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Category</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Painter">Painter</option>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Pest Control">Pest Control</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Price ($)*
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="49.99"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="provider_name"
                  value={formData.provider_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Detailed description of your service..."
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500"
              />
              <label className="text-white font-bold text-lg">
                Mark as Featured Service (Appears on homepage)
              </label>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white/80 text-sm">
                <strong>Your Email:</strong> {user.email} (Auto-linked)
              </p>
            </div>

            {formData.image && (
              <div className="mt-6">
                <p className="text-white font-semibold mb-3">Image Preview:</p>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-xl border-4 border-white/30"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-6 w-6 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding Service...
                </span>
              ) : (
                "Add Service"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
