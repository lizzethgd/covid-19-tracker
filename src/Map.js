import React from "react";
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap, showCountryOnMap } from "./util";

const Map = ({ countries, casesType, center, zoom }) => {
    const ChangeView = ({ center, zoom }) => {
        const map = useMap();
        map.setView(center, zoom);
        map.options.minZoom = 2
        map.options.maxZoom = 15
        return null;
      }
 
  return (
      <div className="map">
      <LeafletMap center={center} zoom={zoom} casesType={casesType} >
          <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      {  
        countries.flag 
        ? showCountryOnMap(countries, casesType)
        : showDataOnMap(countries, casesType)
        }
      </LeafletMap>
      </div>
  );
}

export default Map;
