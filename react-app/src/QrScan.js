import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { callUpdateEventAPI, getEventCount } from './utils'; // Import functions
import ReactGA from "react-ga4"

const QrScan = () => {
  const navigate = useNavigate();
  const { productCode } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await callUpdateEventAPI(productCode,"QR_SCAN"); // Call without navigation
        const count = await getEventCount('QR_SCAN', productCode);
        console.log('QR Scan Count:', count); // Log the count for debugging
        navigate(`/products/${productCode}`); // Navigate after API calls
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [productCode]);

  useEffect(() => {
    ReactGA.send({ hitType: "qrscan", page: window.location.pathname, title: "Product Page" });
  }, [])

  return (
    <div>
      <h2>Redirecting to the product page...</h2>
    </div>
  );
};

export default QrScan;
