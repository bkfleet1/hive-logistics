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
    const { name, value } = event.target;

    setHiveFormData({ ...hiveFormData, [name]: value });
    setName({[name]: value})
    setZoom(Number({[zoom]: value}))    
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
          name: hiveFormData },
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
          {error && <br>Added Hive Failed.</br>}
        </Alert>
        <Container>
          <Form.Group>
            <h1>Hive's Section</h1>
            <Form.Label htmlFor="name">Hive Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleInputChange}
              value={name}
              required
            />
            <Form.Control.Feedback type="invalid">
              Name is required!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="name">Latitiude</Form.Label>
            <Form.Control
              type="text"
              placeholder="latitude"
              name="lat"
              onChange={handleInputChange}
              value={lat}
              disabled
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="name">Longitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="longitude"
              name="lng"
              onChange={handleInputChange}
              value={lng}
              disabled
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="name">Map Zoom</Form.Label>
            <Form.Control
              type="text"
              placeholder="zoom"
              name="zoom"
              onChange={handleInputChange}
              value={zoom}
              disabled
            />
          </Form.Group>

          <Button onClick={() => setClicks([])}>Reset Map</Button>
          </Container>
          
          <Container>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-autoclose-inside" title="Bee Breed">
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

          <Form.Group>
            <Form.Label htmlFor="name">Acquisition Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="AcquisitionSource:"
              name="acquisitionSource"
              onChange={handleInputChange}
              value={hiveFormData.acquisitionSource}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="name">Acquisition Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Acquisition Date"
              name="acquisitionDate"
              onChange={handleInputChange}
              value={hiveFormData.acquisitionDate}
              required
            />
          </Form.Group>

          <Button disabled={!hiveFormData.name} type="submit" variant="success">
            Add
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
