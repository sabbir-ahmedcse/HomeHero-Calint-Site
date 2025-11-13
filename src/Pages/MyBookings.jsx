import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user, token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // Fetch user's bookings
  useEffect(() => {
    if (!user?.email) return;

    const fetchMyBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/bookings?email=${user.email}`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.success) {
          setBookings(data.data || []);
        } else {
          Swal.fire("Error", data.message || "Failed to fetch bookings", "error");
        }
      } catch (err) {
        console.error("Fetch bookings error:", err);
        Swal.fire("Error", "Failed to load your bookings", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [user?.email]);

  // Cancel booking function
  const handleCancelBooking = async (bookingId) => {
    const confirm = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "Keep Booking"
    });

    if (confirm.isConfirmed) {
      setCancellingId(bookingId);
      try {
        const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
          method: "DELETE",
          headers: { 
            'Content-Type': 'application/json'
          }
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Cancel failed");
        }

        if (result.success) {
          // Remove cancelled booking from state
          setBookings(prev => prev.filter(booking => booking._id !== bookingId));
          Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error("Cancel booking error:", err);
        Swal.fire("Error", err.message || "Failed to cancel booking", "error");
      } finally {
        setCancellingId(null);
      }
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500/30 text-green-300';
      case 'pending':
        return 'bg-yellow-500/30 text-yellow-300';
      case 'cancelled':
        return 'bg-red-500/30 text-red-300';
      case 'completed':
        return 'bg-blue-500/30 text-blue-300';
      default:
        return 'bg-gray-500/30 text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading your bookings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
          <p className="text-purple-200 text-lg">
            Manage your service bookings - view details and cancel if needed
          </p>
        </div>

        {/* Bookings Table */}
        <div className="bg-white/10 p-6 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm">
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold mb-2">No Bookings Found</h3>
              <p className="text-purple-200 mb-6 max-w-md mx-auto">
                You haven't booked any services yet. Explore our services and book your first one!
              </p>
              <button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                onClick={() => window.location.href = '/services'}
              >
                Browse Services
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-white/20 rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-left">
                    <th className="p-4 font-semibold">Service</th>
                    <th className="p-4 font-semibold">Booking Date</th>
                    <th className="p-4 font-semibold">Schedule</th>
                    <th className="p-4 font-semibold">Total Price</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr 
                      key={booking._id} 
                      className="border-t border-white/10 hover:bg-white/10 transition-colors duration-200"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-white">
                            {booking.service_title || "Service"}
                          </div>
                          {booking.service_category && (
                            <div className="text-sm text-purple-200 mt-1">
                              {booking.service_category}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-purple-200">
                        {formatDate(booking.booking_date)}
                      </td>
                      <td className="p-4">
                        <div className="text-white">
                          {booking.preferred_date ? formatDate(booking.preferred_date) : "Flexible"}
                        </div>
                        {booking.preferred_time && (
                          <div className="text-sm text-purple-200">
                            {booking.preferred_time}
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-semibold text-green-300">
                        ${booking.total_price || booking.price || "N/A"}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status || 'pending'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <button 
                            onClick={() => handleCancelBooking(booking._id)}
                            disabled={cancellingId === booking._id || booking.status === 'cancelled'}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                              booking.status === 'cancelled' 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700'
                            } ${cancellingId === booking._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {cancellingId === booking._id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Cancelling...
                              </>
                            ) : (
                              <>
                                <span>❌</span>
                                {booking.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
                              </>
                            )}
                          </button>
                          
                          {/* View Details Button */}
                          <button 
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                            onClick={() => {
                              Swal.fire({
                                title: "Booking Details",
                                html: `
                                  <div class="text-left">
                                    <p><strong>Service:</strong> ${booking.service_title || 'N/A'}</p>
                                    <p><strong>Category:</strong> ${booking.service_category || 'N/A'}</p>
                                    <p><strong>Booking Date:</strong> ${formatDate(booking.booking_date)}</p>
                                    <p><strong>Preferred Date:</strong> ${booking.preferred_date ? formatDate(booking.preferred_date) : 'Flexible'}</p>
                                    <p><strong>Time:</strong> ${booking.preferred_time || 'Flexible'}</p>
                                    <p><strong>Total Price:</strong> $${booking.total_price || booking.price || 'N/A'}</p>
                                    <p><strong>Status:</strong> <span class="capitalize">${booking.status || 'pending'}</span></p>
                                    ${booking.special_instructions ? `<p><strong>Instructions:</strong> ${booking.special_instructions}</p>` : ''}
                                  </div>
                                `,
                                icon: "info",
                                confirmButtonColor: "#3085d6",
                              });
                            }}
                          >
                            <span>👁️</span>
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Stats */}
          {bookings.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-6 text-purple-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{bookings.length}</div>
                  <div>Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div>Confirmed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">
                    {bookings.filter(b => b.status === 'pending').length}
                  </div>
                  <div>Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-300">
                    {bookings.filter(b => b.status === 'cancelled').length}
                  </div>
                  <div>Cancelled</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;