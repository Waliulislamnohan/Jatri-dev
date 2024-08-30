"use client";

import { useEffect, useContext } from "react";
import { UserLocationContext } from "../context/UserLocationContext"; 
const Geolocation = () => {
  const { setLocation,location } = useContext(UserLocationContext); 

  const getUserLocation = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("User's location:", { lat: latitude, lon: longitude });

          setLocation({ lat: latitude, lon: longitude });
        },
        (err) => {
          console.error("Error fetching location:", err);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return null; 
};

export default Geolocation;
