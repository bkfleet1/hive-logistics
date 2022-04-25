import "../../index.css";
import { useState } from "react";
import Automap from "../Pages/Automap";
import Manualmap from "../Pages/Manualmap";

function Map() {

    const [checked, setChecked] = useState(false); 
    const handleChange = () => { 
      
      setChecked(!checked); 
      
    }; 


  return (
    <div className="wrapper">
        <div>
            <span>Use device GPS service to acquire latitude & longitude? </span>
        <input type="checkbox" onChange={handleChange}></input>
            {checked ? <Automap /> : <Manualmap />}

        </div>
    </div>
  );
}

export default Map;
