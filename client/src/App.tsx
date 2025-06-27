import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Campaigns from '@pages/Campaigns';
import MessageGenerator from '@pages/MessageGenerator';
import Home from '@pages/Home'; 
import './App.css'
import { Navbar } from '@components/Navbar';
import { ToastContainer } from 'react-toastify';
import Scraper from '@pages/Scraper';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/message-generator" element={<MessageGenerator />} />
            <Route path="/scraper" element={<Scraper />} />
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </main>
      </div>
    </Router>
  );
};

export default App;
