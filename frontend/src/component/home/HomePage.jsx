import React, { useState, useEffect } from "react";
import EquipmentResult from "../common/EquipmentResult";
import EquipmentSearch from "../common/EquipmentSearch";

const HomePage = () => {

    const [equipmentSearchResults, setEquipmentSearchResults] = useState([]);

    //title
    useEffect(() => {
        document.title = "Surfboard Rental | Home";
    }, []);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setEquipmentSearchResults(results);
    };

    return (
        <div className="home bg-slate-50 pb-20">
            {/* HERO SECTION: Cinematic Poster Design */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Parallax Effect */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="./assets/images/surfboard.webp"
                        alt="Surfboard Rental"
                        className="w-full h-full object-cover scale-105"
                    />
                    {/* Gradient Overlay: Darker at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-black/40 to-black/20"></div>
                </div>

                {/* Hero Content: Uses Serif font for luxury feel */}
                <div className="relative z-10 text-center px-4 mt-[-60px] max-w-4xl mx-auto">
                    {/* Tagline: Uppercase with wide spacing */}
                    <p className="text-teal-400 font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4 animate-fade-in">
                        Premium Surf Experience
                    </p>

                    {/* Main Title: Playfair Display font */}
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-2xl">
                        Ride the <span className="italic text-teal-300 font-light">Wild</span> Wave
                    </h1>

                    {/* Subtitle: Clean Inter font */}
                    <h3 className="text-lg md:text-xl text-slate-200 font-light tracking-wide max-w-xl mx-auto leading-relaxed opacity-90">
                        Discover the ocean with our professional-grade boards. <br className="hidden md:block"/>
                        Flexible rentals for every surfer.
                    </h3>
                </div>
            </section>

            {/* SEARCH SECTION: Floating Capsule (Negative margin overlaps hero) */}
            <EquipmentSearch handleSearchResult={handleSearchResult} isHomePage={true} />

            {/* RESULTS SECTION */}
            <div className="container mx-auto px-4 mt-10">
                <EquipmentResult equipmentSearchResults={equipmentSearchResults} />
            </div>

            {/* LINK TO ALL BOARDS */}
            <div className="text-center mt-8">
                <a className="inline-block text-brand font-bold text-lg hover:underline decoration-2 underline-offset-4" href="/equipments">
                    View All Boards &rarr;
                </a>
            </div>

            {/* SERVICES SECTION */}
            <section className="container mx-auto px-4 mt-20">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
                    Services at <span className="text-brand">Surfboard Rental</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Service Card 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                        <img src="./assets/images/boards.png" alt="Wide Board Selection" className="w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Wide Selection</h3>
                        <p className="text-slate-500 leading-relaxed">Choose from a variety of surfboards including shortboards, longboards, and soft tops.</p>
                    </div>

                    {/* Service Card 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                        <img src="./assets/images/calendar.png" alt="Flexible Rental" className="w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Flexible Dates</h3>
                        <p className="text-slate-500 leading-relaxed">Rent boards by day or for multiple days with flexible pick-up and return dates.</p>
                    </div>

                    {/* Service Card 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                        <img src="./assets/images/safety.png" alt="Safety Gear" className="w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Safety First</h3>
                        <p className="text-slate-500 leading-relaxed">Helmets, leashes, and optional wetsuits are available to ensure a safe experience.</p>
                    </div>

                    {/* Service Card 4 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                        <img src="./assets/images/support.png" alt="Local Support" className="w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Local Support</h3>
                        <p className="text-slate-500 leading-relaxed">Get local surf advice, tide information, and board recommendations.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;