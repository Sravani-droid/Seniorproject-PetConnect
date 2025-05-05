import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MapWithDirections = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("DRIVING");

  const murrayShelter = { lat: 36.6007, lng: -88.2982 };

  const fetchDirections = useCallback((travelMode) => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: murrayShelter,
      zoom: 12,
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          directionsService.route(
            {
              origin,
              destination: murrayShelter,
              travelMode: window.google.maps.TravelMode[travelMode],
            },
            (result, status) => {
              if (status === "OK") {
                directionsRenderer.setDirections(result);
                const route = result.routes[0].legs[0];
                setDistance(route.distance.text);
                setDuration(route.duration.text);
              } else {
                alert("Directions request failed: " + status);
              }
            }
          );
        },
        () => alert("Geolocation failed. Enable location services to see directions.")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps) {
      fetchDirections(mode);
    }
  }, [mode, fetchDirections]);

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Directions to Murray-Calloway Animal Shelter</h2>

      <div style={{ marginTop: "10px" }}>
        <label><strong>Select travel mode:</strong> </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
        </select>
      </div>

      {distance && duration && (
        <p style={{ marginTop: "10px" }}>
          <strong>Distance:</strong> {distance} | <strong>Time:</strong> {duration} | <strong>Mode:</strong> {mode.charAt(0) + mode.slice(1).toLowerCase()}
        </p>
      )}

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "12px",
          marginTop: "15px",
        }}
      />
    </div>
  );
};

export default MapWithDirections;