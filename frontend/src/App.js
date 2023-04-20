import React, { useEffect, useState } from "react";
import Map, { Marker, Popup, ScaleControl } from "react-map-gl";
import { AiFillStar } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { format } from "timeago.js";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import "./App.css";
import { useData } from "./hooks/useData";

const REACT_MAP_BOX =
  "pk.eyJ1IjoidmFsZXJpYWpiIiwiYSI6ImNsZ2wxdWttZTAxOHczc3A3MWVwZnE3angifQ.314MsS3nFyKwvM_VFLWQXA";

const EDN_POINTPINS = "http://localhost:8000/pin";

function App() {
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 40,
    zoom: 3,
  });

  const [idLocation, setIdLocation] = useState(null);
  const [location, setLocation] = useState();
  const [newLocation, setNewLocation] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const username = "Valeria";
  // const {location} =useData({keyword:"pin"});

  const getPins = async () => {
    const res = await fetch(EDN_POINTPINS);
    const data = await res.json();
    setLocation(data);
    console.log(data);
  };

  useEffect(() => getPins, []);
  const onMoveMap = (e) => {
    setViewState(e.viewState);
  };
  
  const handledNewPin = async (e) => {
    e.preventDefault();
    const entries = new window.FormData(e.target);
    const title = entries.get("title");
    const desc = entries.get("desc");
    const rating = entries.get("rating");

    const newEntries = {
      username: username,
      title: title,
      desc: desc,
      rating: rating,
      lat: newLocation.lat,
      long: newLocation.lng,
    };
    console.log(newEntries);

    try {
      const res = await fetch(EDN_POINTPINS, {
        method: "POST",
        body: JSON.stringify(newEntries),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setLocation([...location, data]);
    } catch {
      console.log("Error en enviar a la api");
    }
  };

  const onClosePopupLocation = () => {
    setIdLocation(null);
  };

  const onClosePopupNew = () => {
    setNewLocation(null);
  };

  const handledClick = (id) => {
    setIdLocation(id);
    console.log(id);
  };

  const handledNewLocation = (e) => {
    const { lat, lng } = e.lngLat;
    setNewLocation({
      lat,
      lng,
    });
  };

 
  return (
    <div
      className="App"
      style={{ width: "100vw", height: "min-height", position: "relative" }}
    >
      <Map
        {...viewState}
        onMove={onMoveMap}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={REACT_MAP_BOX}
        onDblClick={(e) => handledNewLocation(e)}
      >
        {location?.map((p) => (
          <div key={p._id}>
            <Marker
              longitude={p.long} // Coordenadas de longitud de Francia
              latitude={p.lat}
            >
              <HiLocationMarker
                fontSize={"60px"}
                color="#fd0a54"
                onClick={() => handledClick(p._id)}
              />
            </Marker>
            ;
            {p._id == idLocation && (
              <Popup
                longitude={p.long} // Coordenadas de longitud de Francia
                latitude={p.lat} // Coordenadas de latitud de Francia
                anchor="left"
                onClose={onClosePopupLocation}
              >
                <div className="containerPopup">
                  <span>Place</span>
                  <p>{p.title}</p>
                  <span>Review</span>
                  <p>{p.desc}</p>
                  <span>Raiting</span>
                  <div className="containerStar">
                    {Array(p.rating).fill(<AiFillStar className="star" />)}
                  </div>
                  <span>{p.username}</span>
                  <span>{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </div>
        ))}

        {newLocation && (
          <Popup
            longitude={newLocation.lng} // Coordenadas de longitud de Francia
            latitude={newLocation.lat} // Coordenadas de latitud de Francia
            anchor="left"
            onClose={onClosePopupNew}
          >
            <form className="formPost" onSubmit={(e) => handledNewPin(e)}>
              <label htmlFor="title">Title</label>
              <input id="title" placeholder="Escriba el país" name="title" />
              <label htmlFor="review">Descripción</label>
              <textarea
                id="review"
                placeholder="Escriba la descripción"
                name="desc"
              ></textarea>
              <label>Rating</label>
              <select name="rating">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button>Agregar</button>
            </form>
          </Popup>
        )}
      </Map>

      <div
        className="buttons"
        style={{
          display: "flex",
          gap: "15px",
          position: "absolute",
          right: "30px",
          top: "20px",
        }}
      >
        <button onClick={()=>setIsRegister(true)}>Register</button>
        <button onClick={()=>setIsLogin(true)}>Login</button>
      </div>

      {
        isRegister && <Register/>
      }
      {
        isLogin && <Login/>
      }
    </div>
  );
}
export default App;
