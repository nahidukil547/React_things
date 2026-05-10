import About from './components/Home/About'
import Navbar from './components/Home/Navbar'
import {  Routes, Route, Link } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import './App.css'

import { gsap } from "gsap";
    
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
function App() {
  return (
    <>
      <div className="container">
        <div id='navbar'>
          <Navbar />  
          <Link to="/">Home</Link>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
