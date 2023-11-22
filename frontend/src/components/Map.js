import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Spinner } from "react-bootstrap";

const Map = ({ city, work }) => {
  const [pos, setPos] = useState([]);
  // const [citi, setCiti] = useState(city);
  const [isMap, setIsMap] = useState(false);
  const getData = () => {
    if (city) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        city
      )}?&format=json&addressdetails=1&limit=1&polygon_svg=1`;
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
        })
        .then((data) => {
          if (data?.[0]?.lat && data[0]?.lon) {
            setPos([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          } else {
            setPos([50.365, 18.871]); // Default position
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setPos([51.505, -0.09]); // Default position on error
        });
    }
  };

  const waitForFetch = () => {
    setTimeout(() => {
      setIsMap(true);
    }, 2000);
  };

  useEffect(() => {
    getData();
    // if (!pos) {
    // 	waitForFetch();
    // }
  }, [city]);

  return (
    <>
      {pos.length > 1 ? (
        <MapContainer center={pos} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={pos}>
            <Popup>
              {city} <br /> {work}.
            </Popup>
          </Marker>
        </MapContainer>
      ) : !isMap ? (
        <div className="center">
          <Spinner animation="border" className="spiner" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <MapContainer center={pos} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={pos}>
            <Popup>{work}</Popup>
          </Marker>
        </MapContainer>

        // 				<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        //     <TileLayer
        //       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //     />
        //     <Marker position={position}>
        //       <Popup>
        //         A pretty CSS3 popup. <br /> Easily customizable.
        //       </Popup>
        //     </Marker>
        //   </MapContainer>
      )}
    </>
  );
};

export default Map;
