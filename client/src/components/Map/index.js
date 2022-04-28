import "../../index.css";
import { useState } from "react";
import Automap from "../Automap";
import Manualmap from "../Manualmap";

function Map() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="geoItem">
      <div>
        <span className="inputLabel">Name: </span>
        <input type="text" className="textField" name="name"></input>
      </div>
      <div>
        <span>Use device GPS service to acquire latitude & longitude? </span>
        <input type="checkbox" onChange={handleChange}></input>
      </div>
      {checked ? <Automap /> : <Manualmap />}
    </div>
  );
}

export default Map;