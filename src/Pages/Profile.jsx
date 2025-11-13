import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Mail, LogOut, Edit3, X } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const useAxiosInstance = useAxios()

  // Local states
  const [currentTime, setCurrentTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(user?.displayName || '');
  const [updatedPhoto, setUpdatedPhoto] = useState(user?.photoURL || '');
  const [localUser, setLocalUser] = useState(user || {});

  // Live BD Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Dhaka'
      };
      const formatted = now
        .toLocaleString('en-GB', options)
        .replace(',', '')
        .replace(/(\d+) (\w+) (\d+)/, '$1 $2, $3');
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  //  Handle Update Submit
  const handleUpdate = async (e) => {
  e.preventDefault();

  const updatedUser = {
    name: updatedName,
    email: user.email,
    photoURL: updatedPhoto,
    lastLogin: new Date().toISOString()
  };

  try {
    // ✅ Use your axios instance instead of fetch
    const res = await useAxiosInstance.post('/users', updatedUser);

    if (!res.data) throw new Error('Failed to update user');

    // ✅ Instantly update UI
    setLocalUser({
      ...localUser,
      displayName: updatedName,
      photoURL: updatedPhoto
    });

    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Profile Updated!',
      text: 'Your profile has been successfully updated.',
      confirmButtonColor: '#9333ea'
    });
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: 'Something went wrong. Please try again later.',
      confirmButtonColor: '#ef4444'
    });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md relative">

        {/* Main Card */}
        <div className="backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">

          {/* Avatar */}
          <div className="flex flex-col items-center -mt-16">
            <div className="relative">
              <img
                src={localUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(localUser.displayName || 'User')}&background=c084fc&color=fff&size=256&bold=true`}
                alt={localUser.displayName}
                className="w-32 h-32 rounded-full border-8 border-white shadow-2xl object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-white animate-pulse"></div>
            </div>

            <h1 className="mt-6 text-3xl font-bold text-white">
              {localUser.displayName || 'Unknown User'}
            </h1>
            <p className="text-purple-300 text-sm mt-1">Online Now</p>
          </div>

          {/* Email */}
          <div className="mt-10 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600/60 rounded-full">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-purple-300 text-sm">Email Address</p>
                <p className="text-white font-medium text-lg break-all">{localUser.email}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
            >
              <Edit3 className="w-5 h-5" />
              Edit Profile
            </button>

            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-red-400 hover:bg-red-500 hover:border-red-500 text-red-300 hover:text-white font-semibold py-4 rounded-2xl transition-all transform hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </div>

          {/* Time */}
          <div className="text-center mt-8">
            <p className="text-purple-300 text-xs font-medium tracking-wider animate-pulse">
              {currentTime || 'Loading time...'}
            </p>
            <p className="text-purple-400 text-xs mt-1">Bangladesh Time (GMT+6)</p>
          </div>
        </div>

        {/* Floating Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </div>

      {/* ✅ Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Profile</h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-purple-200 mb-2">Full Name</label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter new name"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2">Photo URL</label>
                <input
                  type="text"
                  value={updatedPhoto}
                  onChange={(e) => setUpdatedPhoto(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter new photo URL"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-105"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
