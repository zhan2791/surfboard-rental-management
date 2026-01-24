import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    // Define common styling logic: highlight if the current page is active; otherwise show standard style
    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-brand font-bold border-b-2 border-brand pb-1 transition-all" // Active state: Brand color + underline
            : "text-slate-600 hover:text-brand font-medium transition-colors pb-1"; // Normal state: Grey + hover color change

    return (
        // Main Navigation Container (Replaces old .navbar)
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">

            {/* Logo Area (Replaces old .navbar-brand) */}
            <div className="text-2xl font-bold text-brand hover:opacity-80 transition-opacity">
                <NavLink to="/home">Surfboard Rental</NavLink>
            </div>

            {/* Navigation Links (Replaces old .navbar-ul) */}
            <ul className="flex gap-6 items-center list-none m-0">
                {/* Links using the dynamic className function */}
                <li><NavLink to="/home" className={navLinkClass}>Home</NavLink></li>
                <li><NavLink to="/equipments" className={navLinkClass}>Equipments</NavLink></li>
                <li><NavLink to="/find-rental" className={navLinkClass}>My Rentals</NavLink></li>

                {/* Conditional rendering based on user roles */}
                {isUser && <li><NavLink to="/profile" className={navLinkClass}>Profile</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" className={navLinkClass}>Admin</NavLink></li>}

                {!isAuthenticated && <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/register" className={navLinkClass}>Register</NavLink></li>}

                {/* Logout Button: Turns red on hover to indicate action */}
                {isAuthenticated && (
                    <li
                        onClick={handleLogout}
                        className="cursor-pointer text-slate-600 hover:text-red-600 font-medium transition-colors"
                    >
                        Logout
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;