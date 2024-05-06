import React, { Component, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import "leaflet-rotate";

import "../node_modules/leaflet/dist/leaflet.css";
import "./styles.css";

// the map object returned by useMap doesnt contain the methods added by leaflet-rotate
function MapSubscriber() {
  let map = useMap();
  useEffect(() => {
    console.log("map", map);
  }, [map]);

  return null;
}

function App() {
  let mapRef = useRef();

  let state = {
    center: [51.505, -0.091],
    zoom: 13
  };

  useEffect(() => {
    console.log("mapRef.current", mapRef);
  }, [mapRef]);
  return (
    <div>
      <MapContainer
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        center={state.center}
        zoom={state.zoom}
        rotate={true}
        touchRotate={true}
        rotateControl={{
          closeOnZeroBearing: false
        }}
        bearing={30}
      >
        <MapSubscriber />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={state.center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
