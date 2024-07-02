// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./ProductPage";
import Home from "./Home";
import QrScan from "./QrScan";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-DNZSKHT0C5";
ReactGA.initialize(TRACKING_ID);

const App = () => (
  <div>
    {/* <h1>My React App</h1> */}
    <Routes>
      <Route path="/products/:productCode" element={<ProductPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/qr-scan/products/:productCode" element={<QrScan />} />
    </Routes>
  </div>
);

export default App;
