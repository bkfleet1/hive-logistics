import React, { useState } from "react";

function Manualmap() {
  const [lat, setLat] = useState("42.3024107");
  const [long, setLong] = useState("-89.0202339");
  const locationState = "Manual Entry";
  const KEY = process.env.REACT_APP_GMAP;
  return (
    <div className="coordinates">
      <div>
        <span className="inputLabel">Latitude </span>
        <input
          type="text"
          className="textField"
          name="latitude"
          onChange={(e) => setLat(e.target.value)}
        ></input>
      </div>
      <div>
        <span className="inputLabel">Longitude </span>
        <input
          type="text"
          className="textField"
          name="longitude"
          onChange={(f) => setLong(f.target.value)}
        ></input>
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

export default Manualmap;
