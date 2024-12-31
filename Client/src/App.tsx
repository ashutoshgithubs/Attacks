import { Turnstile } from '@marsidev/react-turnstile';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
 
  const siteKey:string  = import.meta.env.VITE_SITE_KEY;
  const handleUpdatePassword = async () => {
    setLoading(true);
    setMessage("");
    try {
       await axios.post("http://localhost:3000/password-reset", {
        email,
        otp,
        token,
        newPassword
      });
      setMessage("Password updated successfully!");
    } catch (error) {
      console.log(error);
      setMessage("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">Reset Your Password</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
          <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <Turnstile
            onSuccess={(token) => setToken(token)}
            siteKey = {siteKey}
          />
        </div>
        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-bold text-white transition-colors ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
        {message && (
          <p className={`mt-4 text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
