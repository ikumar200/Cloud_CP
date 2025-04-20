import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import AuthForm from "./components/AuthForm";
import GoogleLogin from "./components/GoogleLogin";
import LogoutButton from "./components/LogoutButton";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./pages/Home";
import SavedRecipes from "./pages/SavedRecipes";
import Landing from "./pages/Landing"; // Make sure this file exists

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // wait until Firebase checks auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false); // stop loading after auth state is resolved

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          console.log(token);

          const res = await fetch("https://cloud-cp-71aq.onrender.com/store_user_data", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: currentUser.email,
              name: currentUser.displayName || "Anonymous",
            }),
          });

          const data = await res.json();
          console.log("Backend Response:", data);
        } catch (err) {
          console.error("Error sending data to backend:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="sticky z-50 top-0 bg-white shadow-md py-1 px-3 flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 no-underline hover:no-underline
"
          >
            Recipe App
          </Link>
          <div className="space-x-4 ">
            {user && (
              <Link to="/home" className="text-blue-500 hover:no-underline">
                Home
              </Link>
            )}
            {user && (
              <Link to="/saved" className="text-blue-500 hover:no-underline">
                Saved
              </Link>
            )}
            {user && <LogoutButton />}
            {!user && (
              <Link to="/login" className="text-blue-500 hover:no-underline">
                Login
              </Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/home" />
              ) : (
                <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
                  <div className="w-full max-w-md space-y-8">
                    <AuthForm />
                    <hr className="border-gray-300" />
                    <GoogleLogin />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/saved"
            element={user ? <SavedRecipes /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
