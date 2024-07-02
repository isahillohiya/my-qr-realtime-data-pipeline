import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import "./Home.css"; // Import CSS file for styling

const Home = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Home Page",
    });
  }, []);

  return (
    <div className="home-container">
      <div className="welcome-container">
        <h1 className="welcome-title">Welcome to My-Qr App</h1>
      </div>
    
      <h1 className="product-list-title">
        Product List:
      </h1>

      <div className="product-list">
        {/* Product cards */}
        <div className="product-card">
          <Link to="/qr-scan/products/2953-20?event_name=QR_SCAN&event_value=2953-20">
            <img
              src={process.env.PUBLIC_URL + "/assets/Images/milwaukeetool_2953-20.jpg"}
              alt="Product 1"
              className="product-image"
            />
            <div className="product-name">M18 FUEL™ 1/4" Hex Impact Driver</div>
          </Link>
        </div>
        <div className="product-card">
          <Link to="/qr-scan/products/2727-20?event_name=QR_SCAN&event_value=2727-20">
            <img
              src={process.env.PUBLIC_URL + "/assets/Images/milwaukeetool_2727-20.jpg"}
              alt="Product 2"
              className="product-image"
            />
            <div className="product-name">M18 FUEL™ 16" Chainsaw (Tool Only)</div>
          </Link>
        </div>
        {/* Add more products as needed */}
      </div>
    </div>
  );
};

export default Home;
