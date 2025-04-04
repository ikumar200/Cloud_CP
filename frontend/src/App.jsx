import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import GoogleLogin from './components/GoogleLogin';
import LogoutButton from './components/LogoutButton';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          console.log('Firebase ID Token:', token);

          // Optional: send user data to your backend
          const res = await fetch('http://localhost:3000/store_user_data', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: currentUser.email,
              name: currentUser.displayName || 'Anonymous'
            })
          });

          const data = await res.json();
          console.log('Backend Response:', data);
        } catch (err) {
          console.error('Error sending data to backend:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      {user ? (
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">Welcome, {user.email}</p>
          <LogoutButton />
        </div>
      ) : (
        <div className="w-full max-w-md space-y-8">
          <AuthForm />
          <hr className="border-gray-300" />
          <GoogleLogin />
        </div>
      )}
    </div>
  );
}

export default App;
