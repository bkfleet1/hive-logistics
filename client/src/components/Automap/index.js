import { useState, useEffect } from "react";

function Automap() {
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const [lat, setLat] = useState("42.3024107");
  const [long, setLong] = useState("-89.0202339");
  const [locationState, setLocationState] = useState([]);

  const KEY = process.env.REACT_APP_GMAP;
  
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

  // Geolocation from user's device
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    },
    error,
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
  );

  return (
    <div className="coordinates">
      <div>
        <span className="inputLabel">Latitude </span>
        <input type="text" className="textField" name="latitude" value={lat}></input>
      </div>
      <div>
        <span className="inputLabel">Longitude </span>
        <input type="text" className="textField" name="longitude" value={long}></input>
      </div>

      <br />
      <div className="googlemap">
        <iframe
          className="gmap"
          title="hive logistics locations"
          src={`https://www.google.com/maps/embed/v1/view?key=${KEY}&maptype=satellite&zoom=19&center=${lat},${long}`}
        ></iframe>
        <div className="mapstats">
          <div>Latitude: {lat} </div>
          <div>Longitude: {long} </div>
          <div>Location State: {locationState} </div>
        </div>
      </div>
    </div>
  );
}

export default Automap;