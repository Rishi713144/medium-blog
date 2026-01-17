import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from "./pages/Blogs";
import { Publish } from './pages/Publish';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Navigate to="/signup" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/publish" element={<Publish />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App