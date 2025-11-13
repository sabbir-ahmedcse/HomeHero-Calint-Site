import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  
  const axiosInstance = useAxios(); // useAxios hook ব্যবহার

  // 🔹 Load logged-in user's services
  const loadServices = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get("/services");
      if (res.data.success) {
        // Filter only the services of logged-in provider
        const myServices = res.data.data.filter(
          (s) => s.provider_email === user.email
        );
        setServices(myServices);
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [user]);

  // 🔹 Delete a service
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Service?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosInstance.delete(`/services/${id}`);
      
      if (res.data.success) {
        Swal.fire("Deleted!", "Service removed successfully", "success");
        await loadServices();
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // 🔹 Edit service modal open
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      price: service.price,
      description: service.description,
      category: service.category || "",
      image: service.image || "",
    });
  };

  // 🔹 Update service
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch(
        `/services/${editingService._id}`,
        formData
      );

      if (res.data.success) {
        Swal.fire("Updated!", "Service updated successfully", "success");
        setEditingService(null);
        await loadServices();
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // 🔹 Cancel edit
  const handleCancelEdit = () => {
    setEditingService(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="mb-6">You need to login to view your services</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Services</h1>
          <button
            onClick={() => (window.location.href = "/add-service")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition"
          >
            Add New Service
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-xl text-purple-200">Loading your services...</p>
          </div>
        )}

        {!loading && services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-purple-200 mb-4">
              You haven't added any services yet.
            </p>
            <button
              onClick={() => (window.location.href = "/add-service")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition"
            >
              Add Your First Service
            </button>
          </div>
        )}

        {!loading && services.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr
                    key={s._id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <td className="p-4">
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-300">
                            No Image
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-semibold">{s.name}</td>
                    <td className="p-4">{s.category || "N/A"}</td>
                    <td className="p-4 font-bold">${s.price}</td>
                    <td className="p-4 max-w-xs">
                      <p className="truncate" title={s.description}>
                        {s.description}
                      </p>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🔹 Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Edit Service
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">
                  Service Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Price ($)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-500"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-500 resize-none"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;