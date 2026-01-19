import React, { useState } from "react";
import EquipmentResult from "../common/EquipmentResult";
import EquipmentSearch from "../common/EquipmentSearch";




const HomePage = () => {

    const [equipmentSearchResults, setEquipmentSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setEquipmentSearchResults(results);
    };

    return (
        <div className="home">
            {/* HEADER / BANNER Equipment SECTION */}
            <section>
                <header className="header-banner">
                    <img src="./assets/images/surfboard.webp" alt="Surdboard Rental" className="header-image" />
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Welcome to <span className="phegon-color">Surfboard Rental</span>
                        </h1><br />
                        <h3>Find and rent boards with flexible dates</h3>
                    </div>
                </header>
            </section>

            {/* SEARCH/FIND AVAILABLE Equipment SECTION */}
            <EquipmentSearch handleSearchResult={handleSearchResult} />
            <EquipmentResult equipmentSearchResults={equipmentSearchResults} />

            <h4><a className="view-rooms-home" href="/equipments">All Boards</a></h4>

            <h2 className="home-services">Services at <span className="phegon-color">Surfboard Rental</span></h2>

            {/* SERVICES SECTION */}
            <section className="service-section"><div className="service-card">
                <img src="./assets/images/boards.png" alt="Wide Board Selection" />
                <div className="service-details">
                    <h3 className="service-title">Wide Board Selection</h3>
                    <p className="service-description">Choose from a variety of surfboards including shortboards, longboards, and beginner-friendly soft tops.</p>
                </div>
            </div>
                <div className="service-card">
                    <img src="./assets/images/calendar.png" alt="Flexible Rental Periods" />
                    <div className="service-details">
                        <h3 className="service-title">Flexible Rental Periods</h3>
                        <p className="service-description">Rent boards by day or for multiple days with flexible pick-up and return dates to suit your surf plan.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/safety.png" alt="Safety Gear Included" />
                    <div className="service-details">
                        <h3 className="service-title">Safety Gear Included</h3>
                        <p className="service-description">Helmets, leashes, and optional wetsuits are available to ensure a safe and comfortable surfing experience.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/support.png" alt="Local Surf Support" />
                    <div className="service-details">
                        <h3 className="service-title">Local Surf Support</h3>
                        <p className="service-description">Get local surf advice, tide information, and board recommendations tailored to your skill level.</p>
                    </div>
                </div>

            </section>
            {/* AVAILABLE EquipmentS SECTION */}
            <section>

            </section>
        </div>
    );
}

export default HomePage;
