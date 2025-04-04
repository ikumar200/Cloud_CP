import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

function AuthForm() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Email/Password Auth</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex justify-center gap-4 mt-4 mb-3">
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <button onClick={handleSignUp} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Sign Up
        </button>
      </div>

      {user && (
        <button onClick={handleLogout} className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      )}
    </div>
  );
}

export default AuthForm;
