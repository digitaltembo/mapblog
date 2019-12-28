import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import iconRetinaUrl from '../assets/marker-icon-2x.png';
import iconUrl from '../assets/marker-icon.png';
import shadowUrl from '../assets/marker-shadow.png';

const OPEN_STREET_MAP_TILES = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";

const position = [44.305525, -73.286654];

const defaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize:  [41, 41]
});

const defaultZoom = 2;

const MapBlog = () => {
  const [zoomLevel, setZoomLevel] = React.useState(defaultZoom);

  const onViewportChanged = ({zoom}) => setZoomLevel(zoom);

  console.log(L);
  return (
      <Map 
        center={position} 
        zoom={defaultZoom} 
        style={{height:window.innerHeight, width: window.innerWidth}}
        onViewportChanged={onViewportChanged}
      >
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
        />
        <TileLayer
          url={OPEN_STREET_MAP_TILES}
          attribution={ATTRIBUTION}
        />
        <Marker position={position} icon={defaultIcon}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      </Map>
  );

}

export default MapBlog;