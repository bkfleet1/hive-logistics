/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import * as ReactDom from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";


const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const Googlemap: React.VFC = () => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  // const [locationState, setLocationState] = useState([]);
  const [lat, setLat] = React.useState([36.610682662075725]);
  const [lng, setLng] = React.useState([-98.77478189719483]);
  const [zoom, setZoom] = React.useState(3);
  const [hiveName, setHiveName] = React.useState([]);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 36.610682662075725,
    lng: -98.77478189719483,
  });


  const mapType = "hybrid";
  const image = {
    url: "../assets/images/hive.png",
  }
  


  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  React.useEffect(() => {
    const Position = clicks?.map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    if (Position[0] !== undefined) {
      const { lat } = Position[0];
      return setLat(lat);
    }
  });

  React.useEffect(() => {
    const Position = clicks?.map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    if (Position[0] !== undefined) {
      const { lng } = Position[0];
      return setLng(lng);
    }
  });

  // React.useEffect(() => {
  //   navigator.permissions
  //     .query({
  //       name: "geolocation",
  //     })
  //     .then((result) => {
  //       setLocationState(result.state);
  //     });
  // }, [locationState]);

  // // Geolocation from user's device

  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     setLat(position.coords.latitude);
  //     setLng(position.coords.longitude);
  //   }
  //   // { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
  // );

  

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Name</label>
      <input
        type="text"
        id="name"
        className="textField"
        name="name"
        onChange={(h) => setHiveName(h.target.value)}
      />
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        className="textField"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        className="textField"
        name="latitude"
        value={lat}
        readOnly
        // onChange={(event) => setLat({ lat: Number(event.target.value) })}
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        className="textField"
        name="longitude"
        value={lng}
        readOnly
        // onChange={(event) => setLng({ lng: Number(event.target.value) })}
      />
      <br />

      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );

  return (
    <div className="coordinates" style={{ height: "50%", width: "50%" }}>
      <div>{form}</div>
      <Wrapper
        apiKey={process.env.REACT_APP_GMAP!}
        render={render}
      >
        <Map
          mapTypeId={mapType}
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} className="marker" position={latLng} label={hiveName} icon={image}/>
          ))}
        </Map>
        <div className="mapstats">
          <div>Latitude: {lat} </div>
          <div>Longitude: {lng} </div>
          <div>Location State: Manual Entry </div>
        </div>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      
    </div>
  );
};

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();


  React.useEffect(() => {
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

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

window.addEventListener("DOMContentLoaded", () => {
  ReactDom.render(<Googlemap />, document.getElementById("root"));
});

export default Googlemap;
