import { BrowserRouter as Router, Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout'
import ProtectedLayout from './layouts/ProtectedLayout'
import Home from './pages/Home'
import About from './pages/About'
import BlogDetails from './pages/BlogDetails'
import Login from './pages/Login'
import Signup from './pages/signup';
import Contact from './pages/Contact'
import Blogs from './pages/Blogs';
import ManageBlogs from './pages/ManageBlogs';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup/>}/>          
          <Route path="/contact" element={<Contact />} />          
        </Route>

        {/* Protected Routes with Auth Layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/manage-blogs" element={<ManageBlogs />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
