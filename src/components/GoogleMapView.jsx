"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import { GoogleMap, LoadScript, MarkerF, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import React, { useContext, useState, useEffect } from "react";
import NavBar from "@/components/NavBar"; 

const vehicleRates = {
  rickshaw: 20,
  car: 50, 
  uber: 25, 
  pickupVan: 15, 
};

const GoogleMapView = () => {
  const { location } = useContext(UserLocationContext);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [distance, setDistance] = useState(0);
  const [vehicleCosts, setVehicleCosts] = useState({});
  const [locationChoice, setLocationChoice] = useState(""); 
  const [directionsResponse, setDirectionsResponse] = useState(null); 

  const containerStyle = {
    width: "100%",
    height: "90vh",
    marginTop: "60px",
  };


  const calculateDistance = (point1, point2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const dLat = toRadians(point2.lat - point1.lat);
    const dLon = toRadians(point2.lng - point1.lng);

    const lat1 = toRadians(point1.lat);
    const lat2 = toRadians(point2.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  };


  const calculateCosts = (distance) => {
    const costs = {};
    for (const [vehicle, rate] of Object.entries(vehicleRates)) {
      costs[vehicle] = (distance * rate).toFixed(2);
    }
    setVehicleCosts(costs);
  };


  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    if (locationChoice === "yourToCustom" && selectedPoints.length < 2) {

      if (selectedPoints.length === 0) {
        setSelectedPoints([{ lat: location.lat, lng: location.lon }]);
      }
      setSelectedPoints((prevPoints) => [...prevPoints, { lat, lng }]);
    } 
    
    else if (locationChoice === "customToCustom" && selectedPoints.length < 2) {
      setSelectedPoints((prevPoints) => [...prevPoints, { lat, lng }]);
    } 
    
    else {
      setSelectedPoints([{ lat, lng }]); 
    }
  };

  useEffect(() => {
    if (selectedPoints.length === 2) {
      const dist = calculateDistance(selectedPoints[0], selectedPoints[1]);
      setDistance(dist.toFixed(2)); 
      calculateCosts(dist);


      getDirections();
    }
  }, [selectedPoints]);


  const handleNavBarSelect = (choice) => {
    setLocationChoice(choice);
  };


  const getDirections = () => {
    const origin = selectedPoints[0];
    const destination = selectedPoints[1];

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <div>
      <NavBar onSelect={handleNavBarSelect} />
      <LoadScript googleMapsApiKey="AIzaSyCvVg7z4J_ItCgeCw1f_6y_ZxDMmMHqUdo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: location?.lat || 0,
            lng: location?.lon || 0,
          }}
          zoom={18}
          onClick={handleMapClick} 
        >

          {selectedPoints.map((point, index) => (
            <MarkerF key={index} position={point} />
          ))}

          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                polylineOptions: {
                  strokeColor: "#FF0000",
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      {selectedPoints.length === 2 && (
        <div className="p-6 bg-white shadow-lg absolute -top-1 rounded-lg mt-6 max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2">Selected Points</h3>
          <p className="text-gray-700 mb-4">
            Point 1: ({selectedPoints[0].lat.toFixed(5)}, {selectedPoints[0].lng.toFixed(5)}) <br />
            Point 2: ({selectedPoints[1].lat.toFixed(5)}, {selectedPoints[1].lng.toFixed(5)})
          </p>
          <p className="text-gray-800 font-semibold">Distance: {distance} km</p>
          <h3 className="text-lg font-bold mt-4">Vehicle Rent Costs:</h3>
          <ul className="mt-2 space-y-1">
            {Object.entries(vehicleCosts).map(([vehicle, cost]) => (
              <li key={vehicle} className="flex justify-between text-gray-600">
                <span>{vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}:</span>
                <span>{cost} Tk</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoogleMapView;
