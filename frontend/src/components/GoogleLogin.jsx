import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white shadow-lg p-6 rounded-xl text-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Google Sign-In</h2>
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 533.5 544.3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M533.5 278.4c0-17.4-1.4-34.1-4.1-50.2H272v95.1h147.3c-6.4 34.6-25.2 63.9-53.7 83.4v69.2h86.9c50.9-46.9 80-116 80-197.5z"
            fill="#4285F4"
          />
          <path
            d="M272 544.3c72.6 0 133.7-24 178.3-65.3l-86.9-69.2c-24.1 16.2-55 25.8-91.4 25.8-70.3 0-130-47.5-151.3-111.4H32.1v69.9c44.8 88.4 136.8 150.2 239.9 150.2z"
            fill="#34A853"
          />
          <path
            d="M120.7 324.2c-10.5-31.5-10.5-65.5 0-97l-88.6-69.9C7.7 218.5-9.6 272.2 0 324.2l88.6 69.9z"
            fill="#FBBC05"
          />
          <path
            d="M272 107.7c39.4 0 75 13.5 103 39.6l77.1-77.1C405.5 24 344.5 0 272 0 168.9 0 76.9 61.8 32.1 150.2l88.6 69.9c21.3-63.9 81-111.4 151.3-111.4z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
