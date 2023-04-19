import React, { useEffect, useState } from "react";
import Map, { Marker, Popup, ScaleControl } from "react-map-gl";
import { AiFillStar } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { format} from "timeago.js"
import "./App.css";
import { useData } from "./hooks/useData";

const REACT_MAP_BOX =
  "pk.eyJ1IjoidmFsZXJpYWpiIiwiYSI6ImNsZ2wxdWttZTAxOHczc3A3MWVwZnE3angifQ.314MsS3nFyKwvM_VFLWQXA";

const EDN_POINTPINS = "http://localhost:8000/pin";

function App() {
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 40,
    zoom: 4,
  });
  const [idLocation, setIdLocation] = useState(null);
   const [location, setLocation] = useState();
  // const {location} =useData({keyword:"pin"});

  const onMoveMap = (e) => {
    setViewState(e.viewState);
  };

  // const onClosePopup = () => {
  //   setShowPopup(false);
  // };

  const handledClick=(id)=>{
    setIdLocation(id)
  }
   const getPins = async () => {
     const res = await fetch(EDN_POINTPINS);
     const data = await res.json();
     setLocation(data)
     console.log(data);
   };

   useEffect(() => getPins, []);
  return (
    <div className="App">
      <Map
        {...viewState}
        onMove={onMoveMap}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={REACT_MAP_BOX}
      >
        {location?.map((p) => (
          <>
            <Marker
              key={p._id}
              longitude={2.294694} // Coordenadas de longitud de Francia
              latitude={48.858093}
              onClick={()=>handledClick(p._id)}
            >
              <HiLocationMarker fontSize={"30px"} color="#fd0a54" />
            </Marker>
            ;
            {p._id === idLocation && (
              <Popup
                longitude={2.294694} // Coordenadas de longitud de Francia
                latitude={48.858093} // Coordenadas de latitud de Francia
                anchor="left"
                // onClose={onClosePopup}
              >
                <div className="containerPopup">
                  <span>Place</span>
                  <p>{p.title}</p>
                  <span>Review</span>
                  <p>{p.desc}</p>
                  <span>Raiting</span>
                  <div className="containerStar">
                    <AiFillStar className="star" />
                    <AiFillStar className="star" />
                    <AiFillStar className="star" />
                    <AiFillStar className="star" />
                    <AiFillStar className="star" />
                  </div>
                  <span>{p.username}</span>
                  <span>{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
      </Map>
    </div>
  );
}
export default App;
