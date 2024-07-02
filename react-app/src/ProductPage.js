import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventCount, callUpdateEventAPI } from "./utils"; // Import functions
import ReactGA from "react-ga4";

const ProductPage = () => {
  const { productCode } = useParams();
  const [qrScanCount, setQrScanCount] = useState(null);
  const [documentDownloads, setDocumentDownloads] = useState({});
  const navigate = useNavigate();

  // Example product data structure (modify as needed)
  const productData = {
    "2953-20": {
      title: 'M18 FUEL™ 1/4" Hex Impact Driver',
      productCode: "2953-20",
      description:
        "Our M18 FUEL™ ¼” Hex Impact Driver is the Most POWERFUL and FASTEST DRIVING impact driver, featuring ULTIMATE TRIGGER CONTROL. Our POWERSTATE™ Brushless motor delivers unmatched power for a full range of capabilities to complete the widest variety of applications. Increase productivity on the jobsite with the fastest driving speed of any impact driver without sacrificing power or control. REDLINK PLUS™ intelligence delivers ULTIMATE TRIGGER CONTROL by providing smooth acceleration for small fasteners to prevent stripping of screws or damaging of materials. Our M18™ REDLITHIUM™ Battery Packs deliver more work per charge and more work over the life of the pack. Featuring 4-mode drive control provides our users with greater control over output speed and power. Self-Tapping Screw Mode is designed to reduce walking when starting self-tapping screws as well as reduce overdriving, breaking, and stripping out screws. This new impact driver also features Tri-LED lighting, illuminating the area of work while eliminating shadows. Our M18 FUEL ¼” Hex Impact Driver is part of our M18 system which is fully compatible with over 200+ solutions.",
      image:
        process.env.PUBLIC_URL + "/assets/Images/milwaukeetool_2953-20.jpg",
      qrScans: 150,
      documents: [
        {
          name: "OPERATOR MANUAL",
          url: "/assets/Documents/milwaukeetool_2953-20_OPERATOR_MANUAL.pdf",
          downloads: 100,
        },
        {
          name: "SERVICE PARTS LIST",
          url: "/assets/Documents/milwaukeetool_2953-20_SERVICE_PARTS_LIST.pdf",
          downloads: 150,
        },
      ],
    },
    "2727-20": {
      title: 'M18 FUEL™ 16" Chainsaw (Tool Only)',
      productCode: "2727-20",
      description:
        'The Milwaukee® M18 FUEL™ 16" Chainsaw delivers the power to cut hardwoods, cuts faster than gas, and delivers up to 150 cuts per charge. The unit is designed to meet the performance, durability and ergonomic needs of professional landscape maintenance, power utility, and the installed M18 user. The POWERSTATE™ Brushless Motor maintains speed under heavy loads without bogging down to outperform small gas engines and higher voltage systems. REDLINK PLUS™ intelligence ensures maximum performance and protection from overload, overheating and over discharge. The M18™ REDLITHIUM™ High Output™ HD12.0 battery delivers unmatched run-time in all applications. M18 FUEL™ technology allows the unit to reach full throttle in under 1 second providing ultimate control and productivity.',
      image:
        process.env.PUBLIC_URL + "/assets/Images/milwaukeetool_2727-20.jpg",
      qrScans: 120,
      documents: [
        {
          name: "OPERATOR MANUAL",
          url: "/assets/Documents/milwaukeetool_2727-20_OPERATOR_MANUAL.pdf",
          downloads: 80,
        },
        {
          name: "SERVICE PARTS LIST",
          url: "/assets/Documents/milwaukeetool_2727-20_SERVICE_PARTS_LIST.pdf",
          downloads: 100,
        },
      ],
    },
    // Add other products as needed
  };

  useEffect(() => {
    const fetchQrScanCount = async () => {
      if (productCode && productData[productCode]) {
        const count = await getEventCount(
          "QR_SCAN",
          productData[productCode].productCode
        );
        setQrScanCount(count);
      }
    };

    const fetchDocumentDownloads = async () => {
      if (productCode && productData[productCode]) {
        const downloads = {};
        for (const doc of productData[productCode].documents) {
          const count = await getEventCount("DOWNLOAD", doc.url); // Assuming doc.url uniquely identifies each document
          downloads[doc.url] = count;
        }
        setDocumentDownloads(downloads);
      }
    };

    fetchQrScanCount();
    fetchDocumentDownloads();
  }, []);

  const product = productData[productCode];
  useEffect(() => {
    const handleBackButton = () => {
      navigate("/");
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);
  if (!product) {
    return <div>Product not found</div>;
  }

  // Function to handle document download click
  const handleDocumentDownload = async (event_name, event_value) => {
    ReactGA.event({
      category: "Assets",
      action: "download",
      value: event_value,
    });

    // Increment the download count in the UI
    setDocumentDownloads((prevDownloads) => ({
      ...prevDownloads,
      [event_value]: (Number(prevDownloads[event_value]) || 0) + 1,
    }));

    try {
      await callUpdateEventAPI(event_value, event_name);
      // Optionally, you can trigger the download programmatically here
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="product-page">
      <div className="product-info">
        <div className="image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="details-container">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="statistics">
        <h3>Statistics</h3>
        <p>
          QR Code Scans: {qrScanCount !== null ? qrScanCount : "Loading..."}
        </p>
      </div>
      <div className="documents">
        <h3>Documents</h3>
        <ul>
          {product.documents.map((doc, index) => (
            <li key={index}>
              <a
                href={
                  doc.url +
                  "?event_name=DOWNLOAD&event_value=" +
                  getPdfName(doc.url)
                }
                download
                onClick={() => handleDocumentDownload("DOWNLOAD", doc.url)}
              >
                {doc.name}
              </a>
              <span className="download-count">
                {" "}
                (
                {documentDownloads[doc.url] !== undefined
                  ? documentDownloads[doc.url]
                  : "Loading..."}{" "}
                downloads)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function getPdfName(path) {
  // Split the path using forward slash (/) or backslash (\) as separators
  const parts = path.split(/[/\\]/);
  // Return the last element (the filename)
  return parts.pop();
}

export default ProductPage;
