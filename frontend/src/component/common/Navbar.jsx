import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    // --- State & Auth Logic ---
    const [isOpen, setIsOpen] = useState(false); // Controls mobile menu toggle state
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            setIsOpen(false); // Close mobile menu upon logout
            navigate('/home');
        }
    };

    // --- Styling Logic ---
    // Dynamic class for links: highlights the active route
    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-brand font-bold border-b-2 border-brand pb-1 transition-all block" // Active state styling
            : "text-slate-600 hover:text-brand font-medium transition-colors pb-1 block"; // Normal state styling

    // --- Helper Function ---
    // Renders navigation items to avoid code duplication between Desktop and Mobile views
    const renderNavLinks = () => (
        <>
            <li><NavLink to="/home" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/equipments" className={navLinkClass} onClick={() => setIsOpen(false)}>Equipments</NavLink></li>
            <li><NavLink to="/find-rental" className={navLinkClass} onClick={() => setIsOpen(false)}>My Rentals</NavLink></li>

            {isUser && <li><NavLink to="/profile" className={navLinkClass} onClick={() => setIsOpen(false)}>Profile</NavLink></li>}
            {isAdmin && <li><NavLink to="/admin" className={navLinkClass} onClick={() => setIsOpen(false)}>Admin</NavLink></li>}

            {!isAuthenticated && <li><NavLink to="/login" className={navLinkClass} onClick={() => setIsOpen(false)}>Login</NavLink></li>}
            {!isAuthenticated && <li><NavLink to="/register" className={navLinkClass} onClick={() => setIsOpen(false)}>Register</NavLink></li>}

            {isAuthenticated && (
                <li
                    onClick={handleLogout}
                    className="cursor-pointer text-slate-600 hover:text-red-600 font-medium transition-colors block"
                >
                    Logout
                </li>
            )}
        </>
    );

    return (
        // Main Nav Container: Sticky positioning ensures it stays at the top
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="flex justify-between items-center px-8 py-4">

                {/* Logo Section */}
                <div className="text-2xl font-bold text-brand hover:opacity-80 transition-opacity">
                    <NavLink to="/home">Surfboard Rental</NavLink>
                </div>

                {/* --- Desktop Menu --- */}
                {/* Hidden on mobile, Flex on medium screens (md) and up */}
                <ul className="hidden md:flex gap-6 items-center list-none m-0">
                    {renderNavLinks()}
                </ul>

                {/* --- Mobile Hamburger Button --- */}
                {/* Visible on mobile, Hidden on medium screens (md) and up */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 focus:outline-none" aria-label="Toggle menu">
                        {isOpen ? (
                            // Close Icon (X)
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            // Hamburger Icon (Menu)
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* --- Mobile Dropdown Menu --- */}
            {/* Conditionally rendered based on 'isOpen' state */}
            {isOpen && (
                <div className="md:hidden border-t px-8 py-4 bg-white">
                    <ul className="flex flex-col space-y-4 list-none m-0">
                        {renderNavLinks()}
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;