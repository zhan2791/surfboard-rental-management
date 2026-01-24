import React from 'react';

const FooterComponent = () => {
    return (
        // Footer Container: Dark background with top border
        <footer className="bg-slate-900 text-slate-300 py-12 mt-auto border-t border-slate-800">
            <div className="container mx-auto px-6">

                {/* 3-Column Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Column 1: Brand & Description */}
                    <div className="text-center md:text-left">
                        <h3 className="font-serif text-3xl text-white mb-4 italic">Surfboard Rental</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            The best waves are waiting. Rent high-quality gear and get local insights for your next adventure.
                        </p>
                    </div>

                    {/* Column 2: Navigation Links */}
                    <div className="text-center">
                        <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-sm">Explore</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/home" className="hover:text-brand transition-colors">Home</a></li>
                            <li><a href="/equipments" className="hover:text-brand transition-colors">Our Boards</a></li>
                            <li><a href="/profile" className="hover:text-brand transition-colors">My Profile</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="text-center md:text-right">
                        <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-sm">Contact</h4>
                        <p className="text-sm mb-2">123 Ocean Drive, Gold Coast</p>
                        <p className="text-sm mb-2">hello@surfrental.com</p>
                        <p className="text-brand font-bold text-lg mt-4">+61 400 123 456</p>
                    </div>
                </div>

                {/* Bottom Bar: Copyright */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Surfboard Rental. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-white">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-white">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;