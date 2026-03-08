import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App overflow-x-hidden min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:p-4 focus:bg-orange-600 focus:text-white focus:rounded-md focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:[clip:auto] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
      >
        Skip to main content
      </a>
      <BrowserRouter>
        <Navbar />
        <main id="main-content">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;