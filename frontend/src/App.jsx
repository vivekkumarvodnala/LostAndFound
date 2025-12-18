import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import PostDetails from "./pages/PostDetails";
import UpdatePost from "./pages/UpdatePost.jsx";
import CreateItem from "./pages/CreateItem";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard.jsx";
import MyPostsPage from "./pages/MyPostsPage";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-white transition-all duration-300">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <main className="flex-grow pt-16 pb-6 px-4 sm:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/edit-post/:id" element={<UpdatePost />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/myposts"
            element={
              <PrivateRoute>
                <MyPostsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/update-profile"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
