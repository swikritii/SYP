import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';

// Fix for default marker icon in Leaflet + Vite/Webpack
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Helper: returns [lat, lng] only if both are valid numbers, else null
const safeCoords = (lat, lng) => {
  const la = parseFloat(lat);
  const lo = parseFloat(lng);
  return (!isNaN(la) && !isNaN(lo)) ? [la, lo] : null;
};

const RecenterMap = ({ center }) => {
  const map = useMap();
  if (center && !isNaN(center[0]) && !isNaN(center[1])) {
    map.setView(center, map.getZoom());
  }
  return null;
};

const MapComponent = ({ courts, singleCourt, height = '400px' }) => {
  // Default center of Nepal
  const defaultCenter = [28.3949, 84.1240];
  const zoom = singleCourt ? 15 : 7;

  let center = defaultCenter;
  if (singleCourt) {
    center = safeCoords(singleCourt.latitude, singleCourt.longitude) || defaultCenter;
  } else if (courts && courts.length > 0) {
    const first = courts.find(c => safeCoords(c.latitude, c.longitude));
    center = first ? safeCoords(first.latitude, first.longitude) : defaultCenter;
  }

  return (
    <div style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {singleCourt && safeCoords(singleCourt.latitude, singleCourt.longitude) && (
          <Marker position={safeCoords(singleCourt.latitude, singleCourt.longitude)}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-gray-800">{singleCourt.name}</h3>
                <p className="text-sm text-gray-600">{singleCourt.location}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {!singleCourt && courts && courts.map((court) => {
          const pos = safeCoords(court.latitude, court.longitude);
          return pos ? (
            <Marker key={court.id} position={pos}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-gray-800">{court.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{court.location}</p>
                  <Link 
                    to={`/court/${court.id}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium underline"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ) : null;
        })}
        
        <RecenterMap center={center} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
