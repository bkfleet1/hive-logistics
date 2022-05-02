import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// import Dropdown from 'react-bootstrap/Dropdown';
import { useMutation } from "@apollo/client";
import { ADD_HIVE } from "../utils/mutations";
import Auth from "../utils/auth";
import { Container } from "react-bootstrap";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import ReactDom from "react-dom";

const Hive = () => {
  const [hiveFormData, setHiveFormData] = useState({ name: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addHive, { data, loading, error }] = useMutation(ADD_HIVE);
  const [clicks, setClicks] = useState([]);
  const [lat, setLat] = useState([36.610682662075725]);
  const [lng, setLng] = useState([-98.77478189719483]);
  const [zoom, setZoom] = useState(15);
  const [name, setName] = useState([]);
  const [center, setCenter] = useState({
    lat: 36.610682662075725,
    lng: -98.77478189719483,
  });
  const mapType = "hybrid";
  const image = { url: "../assets/images/hive.png" };
  const render = (status) => {
    return <h1>{status}</h1>;
  };
  const onClick = (e) => {
    setClicks([e.latLng]);
  };
  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };
  useEffect(() => {
    const Position = clicks?.map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    if (Position[0] !== undefined) {
      const { lat } = Position[0];
      return setLat(lat);
    }
  });
  useEffect(() => {
    const Position = clicks?.map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    if (Position[0] !== undefined) {
      const { lng } = Position[0];
      return setLng(lng);
    }
  });




  const handleInputChange = (event) => {
    // const { name, value } = event.target;

    setHiveFormData({ ...hiveFormData, 
                      [name]: event.target.value, 
                      [lat]: event.target.value,
                      [lng]: event.target.value });
    setName({ [name]: value })
    setZoom(Number({ [zoom]: value }))
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    try {
      console.log(hiveFormData);
      addHive({
        variables: {
          name: hiveFormData
        },
      });
      setHiveFormData({
        hiveFormData,
      });
      //Auth.login(data.addApiary.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Wrapper apiKey={process.env.REACT_APP_GMAP} render={render}>
        <Map mapTypeId={mapType} center={center} onClick={onClick} onIdle={onIdle} zoom={zoom} style={{ flexGrow: "1", height: "50%", width: "50%" }}>
          {clicks.map((latLng, i) => (<Marker key={i} className="marker" position={latLng} label={name} icon={image} />))}
        </Map>
        <div className="mapstats">
          <div>Latitude: {lat} </div>
          <div>Longitude: {lng} </div>
        </div>
      </Wrapper>


      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          {error && <br>Failed to create bee hive</br>}
        </Alert>
        <Container>
          <Form.Group className="inputField iFText" controlId="name">
            <h1>Bee Hive</h1>
            <Form.Label htmlFor="name">Hive Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              name="name"
              onChange={handleInputChange}
              value={name}
              required
            />
            <Form.Control.Feedback type="invalid">
              Name is required!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="inputField iFGeo" controlId="lat">
            <Form.Label htmlFor="lat">Latitiude</Form.Label>
            <Form.Control
              type="text"
              placeholder="latitude"
              name="lat"
              onChange={handleInputChange}
              value={lat}
              disabled
            />
          </Form.Group>

          <Form.Group className="inputField iFGeo" controlId="lng">
            <Form.Label htmlFor="lng">Longitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="longitude"
              name="lng"
              onChange={handleInputChange}
              value={lng}
              disabled
            />
          </Form.Group>

          <Form.Group className="inputField iFGeo" controlId="zoom">
            <Form.Label htmlFor="zoom">Map Zoom</Form.Label>
            <Form.Control
              type="text"
              placeholder="zoom"
              name="zoom"
              onChange={handleInputChange}
              value={zoom}
              disabled
            />
          </Form.Group>

          <Form.Group>
          <Button variant="secondary" onClick={() => setClicks([])}>Reset Map</Button>
          </Form.Group>

        <Form.Group className="inputField iFDrop" controlId="status">
        <Form.Label htmlFor="status">Hive Status</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-autoclose-inside" title="Hive Status">
              Hive Status
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item name="status" value="Active">Active</Dropdown.Item>
              <Dropdown.Item name="status" value="Inactive">Inactive</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
          </Form.Group>
          
          <Form.Group className="inputField iFDrop" controlId="beeBreed">
          <Form.Label htmlFor="beeBreed">Bee Breed</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-autoclose-inside" title="Bee Breed">
              Bee Breed
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item name="beeBreed" value="African">African</Dropdown.Item>
              <Dropdown.Item name="beeBreed" value="Buckfast">Buckfast</Dropdown.Item>
              <Dropdown.Item name="beeBreed" value="Carnolian">Carnolian</Dropdown.Item>
              <Dropdown.Item name="beeBreed" value="German">German</Dropdown.Item>
              <Dropdown.Item name="beeBreed" value="Italian">Italian</Dropdown.Item>
              <Dropdown.Item name="beeBreed" value="Russian">Russian</Dropdown.Item>
              <Dropdown.Item name="beeBreed" value="Wild Caught">Wild Caught</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Form.Group>

          <Form.Group className="inputField iFText" controlId="acquisitionSource">
            <Form.Label htmlFor="acquisitionSource">Acquisition Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Acquisition Source"
              name="acquisitionSource"
              onChange={handleInputChange}
              value={hiveFormData.acquisitionSource}
              required
            />
          </Form.Group>

          <Form.Group className="inputField iFDate" controlId="acquisitionDate">
            <Form.Label htmlFor="acquisitionDate">Acquisition Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Acquisition Date"
              name="acquisitionDate"
              onChange={handleInputChange}
              value={hiveFormData.acquisitionDate}
              required
            />
          </Form.Group>

          <Form.Group className="inputField iFDrop" controlId="boxType">
          <Form.Label htmlFor="boxType">Box Type</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-autoclose-inside" title="Box Type">
              Box Type
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item name="boxType" value="Flow Hive">Flow Hive</Dropdown.Item>
              <Dropdown.Item name="boxType" value="Langstroth">Langstroth</Dropdown.Item>
              <Dropdown.Item name="boxType" value="Layens">Layens</Dropdown.Item>
              <Dropdown.Item name="boxType" value="Long Langstroth">Long Langstroth</Dropdown.Item>
              <Dropdown.Item name="boxType" value="Top Bar">Top Bar</Dropdown.Item>
              <Dropdown.Item name="boxType" value="Warre">Warre</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Form.Group>

          <Form.Group className="inputField" controlId="frameCount">
          <Form.Label htmlFor="frameCount">Frame Count</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-autoclose-inside" title="Frame Count">
              Frame Count
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item name="frameCount iFDrop" value="1">1</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="2">2</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="3">3</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="4">4</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="5">5</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="6">6</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="7">7</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="8">8</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="9">9</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="10">10</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="11">11</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="12">12</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="13">13</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="14">14</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="15">15</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="16">16</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="17">17</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="18">18</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="19">19</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="20">20</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="21">21</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="22">22</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="23">23</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="24">24</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="25">25</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="26">26</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="27">27</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="28">28</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="29">29</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="30">30</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="31">31</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="32">32</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="33">33</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="34">34</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="35">35</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="36">36</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="37">37</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="38">38</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="39">39</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="40">40</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="41">41</Dropdown.Item>
              <Dropdown.Item name="frameCount" value="42">42</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Form.Group>

          <Form.Group className="inputField iFDate" controlId="deploymentDate">
            <Form.Label htmlFor="deploymentDate">Deployment Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Deployment Date"
              name="deploymentDate"
              onChange={handleInputChange}
              value={hiveFormData.deploymentDate}
              required
            />
          </Form.Group>


          <Button type="submit" variant="secondary">
            Create Hive
          </Button>
        </Container>
      </Form>
    </>
  )
}
const Map = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = React.useRef(null);
  const [map, setMap] = useState();
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) => google.maps.event.clearListeners(map, eventName));
      if (onClick) {
        map.addListener("click", onClick);
      }
      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  return (<>
    <div ref={ref} style={style} />
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // set the map prop on the child component
        return React.cloneElement(child, { map });
      }
    })}
  </>);
};
const Marker = (options) => {
  const [marker, setMarker] = useState();
  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};
const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
  // TODO extend to other types
  // use fast-equals for other objects
  return deepEqual(a, b);
});
function useDeepCompareMemoize(value) {
  const ref = React.useRef();
  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}
function useDeepCompareEffectForMaps(callback, dependencies) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
};

// window.addEventListener("DOMContentLoaded", () => {
//   ReactDom.render(<Googlemap />);
// });

export default Hive;
