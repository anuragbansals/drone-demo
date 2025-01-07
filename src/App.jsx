import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [listItems, setListItems] = useState([]);

  const handleLatChange = (text) => {
    if (!text.match(/[a-z]/i)) {
      setLatitude(text);
    }
  };

  const handleLongChange = (text) => {
    if (!text.match(/[a-z]/i)) {
      setLongitude(text);
    }
  };

  const handleAdd = () => {
    setListItems([...listItems, { latitude: latitude, longitude: longitude }]);
    setLatitude("");
    setLongitude("");
  };

  const handleDelete = (ind) => {
    let updatedItems = listItems.filter((_, i) => ind !== i);
    setListItems(updatedItems);
  };

  return (
    <>
      <>
        <div className="container">
          <h2>Waypoint {listItems.length + 1} </h2>
          <input
            type="text"
            value={latitude}
            onChange={(e) => handleLatChange(e.target.value)}
            placeholder="Latitude..."
          />
          <input
            type="text"
            value={longitude}
            onChange={(e) => handleLongChange(e.target.value)}
            placeholder="Longitude..."
          />

          <button
            disabled={latitude.length === 0 || longitude.length === 0}
            onClick={() => handleAdd()}
          >
            ADD
          </button>
        </div>
      </>
      {listItems.map((ele, ind) => (
        <div key={ind}>
          <div key={ind} className="container">
            <h2>Waypoint {ind + 1}</h2>
            <input
              disabled
              type="text"
              value={ele.latitude}
              onChange={(e) => handleLatChange(e.target.value)}
              placeholder="Latitude..."
            />
            <input
              type="text"
              disabled
              value={ele.longitude}
              onChange={(e) => handleLongChange(e.target.value)}
              placeholder="Longitude..."
            />
            <button onClick={() => handleDelete(ind)}>DELETE</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
