import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
    const navLinkClasses =
        "block w-full text-left py-3 px-6 text-xl font-medium rounded-lg " +
        "text-gray-800 hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200";

    const activeNavLinkClasses = "bg-indigo-100 text-indigo-700 font-semibold";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 z-50 md:hidden flex flex-col"
                    >
                        <div className="flex justify-end mb-8">
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-light">
                                &times;
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
                                }
                                onClick={onClose}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/campaigns"
                                className={({ isActive }) =>
                                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
                                }
                                onClick={onClose}
                            >
                                Campaigns
                            </NavLink>
                            <NavLink
                                to="/message-generator"
                                className={({ isActive }) =>
                                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
                                }
                                onClick={onClose}
                            >
                                Message Generator
                            </NavLink>
                            <NavLink
                                to="/scraper"
                                className={({ isActive }) =>
                                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
                                }
                                onClick={onClose}
                            >
                                Scraper
                            </NavLink>
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileDrawer;
