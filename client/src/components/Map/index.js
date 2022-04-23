import "../../App.css";
import { useState, useEffect } from "react";

function Map() {
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [locationState, setLocationState] = useState([]);

    const KEY = process.env.REACT_APP_GMAP
  
  
  
    // Geolocation from user's device
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      error,
      { enableHighAccuracy: true, 
        timeout: 5000,
        maximumAge: 5000
      }
    );
  
    // permission check on access to user's geolocation service on device
    useEffect(() => {
      navigator.permissions
        .query({
          name: "geolocation",
        })
        .then((result) => {
          setLocationState(result.state);
        });
    }, [locationState]);
  

   
    return (
      <div
        className="App"
        style={{
          backgroundColor: "#FFC947",
          width: "100%",
          height: "100%",
          margin: "0",
        }}
      > 
        <h2 style={{ color: "#28527A" }}>Location State: {locationState}</h2>
        <br />
        <div className="googlemap">
        <iframe
          className="gmap"
          title="hive logistics locations"
          src={`https://www.google.com/maps/embed/v1/view?key=${KEY}&maptype=satellite&zoom=19&center=${lat},${long}`}
        ></iframe>
        <div>
          <div>Latitude: {`${lat}`}</div>
          <div>Longitude: {`${long}`}</div>
        </div>
      </div>
      </div>
    );
  }
  
  export default Map;