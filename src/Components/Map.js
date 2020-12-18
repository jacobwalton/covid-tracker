import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./map.css";
import { showDataOnMap } from "../util.js"

function Map({ countries, center, zoom, casesType }) {
  return (
    <div className="Map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
