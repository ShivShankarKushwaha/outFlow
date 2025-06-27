import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaCross } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const desktopNavLinkClasses =
    "relative px-4 py-2 rounded-md transition-all duration-300 ease-in-out " +
    "text-gray-700 hover:text-indigo-700 " +
    "hover:bg-white/20 hover:shadow-md " +
    "hover:backdrop-blur-sm ";

  const activeDesktopNavLinkClasses = "font-semibold text-indigo-600 bg-white/30 shadow-inner";

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-20"> 
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-indigo-600">
          OutFlo.io
        </NavLink>

        <div className="hidden md:flex space-x-2 sm:space-x-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${desktopNavLinkClasses} ${isActive ? activeDesktopNavLinkClasses : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/campaigns"
            className={({ isActive }) =>
              `${desktopNavLinkClasses} ${isActive ? activeDesktopNavLinkClasses : ''}`
            }
          >
            Campaigns
          </NavLink>
          <NavLink
            to="/message-generator"
            className={({ isActive }) =>
              `${desktopNavLinkClasses} ${isActive ? activeDesktopNavLinkClasses : ''}`
            }
          >
            Message Generator
          </NavLink>
          <NavLink
            to="/scraper"
            className={({ isActive }) =>
              `${desktopNavLinkClasses} ${isActive ? activeDesktopNavLinkClasses : ''}`
            }
          >
            Scraper
          </NavLink>
        </div>

        <div className="md:hidden" onClick={toggleDrawer}>
            {
                isDrawerOpen ? (
                    <FaCross/>
                ) : (
                    <RxHamburgerMenu/>
                )
            }
        </div>
      </div>
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </nav>
  );
};
