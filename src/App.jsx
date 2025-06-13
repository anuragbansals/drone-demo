import { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import WayPoints from "./wayPoints.jsx";
import Header from "./header.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [altitude, setAltitude] = useState("");
  const [state, setState] = useState({ listItems: [] });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  let params = new URLSearchParams(window.location.search);
  let filename = params.get("user");
  const handleSubmit = async () => {
    let temp = state.listItems.map((ele) => {
      return {
        Lat: ele.latitude,
        Long: ele.longitude,
        Height: ele.altitude,
      };
    });
    let data = {
      Waypoints: temp,
    };
    try {
      setLoading(true);
      let response = await axios.post(
        `http://${window.location.host}/add-wp?filename=${filename}`,
        data
      );
      toast("Data saved successfully!", {
        type: "success",
      });
      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      setLoading(false);
      toast(error.message, {
        type: "error",
      });
    }
  };

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

  const handleAltChange = (text) => {
    if (!text.match(/[a-z]/i)) {
      setAltitude(text);
    }
  };

  const handleAdd = () => {
    setState({
      listItems: [
        ...state.listItems,
        {
          latitude: latitude,
          longitude: longitude,
          altitude: altitude,
          id: `id-${latitude * longitude * altitude * state.listItems.length}`,
        },
      ],
    });
    setLatitude("");
    setLongitude("");
    setAltitude("");
    window.scrollTo(0, document.body.scrollHeight);
  };

  const handleDelete = (ind) => {
    let updatedItems = state.listItems.filter((_, i) => ind !== i);
    setState({
      listItems: updatedItems,
    });
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const listItems = reorder(
      state.listItems,
      result.source.index,
      result.destination.index
    );

    setState({ listItems });
  }

  return (
    <div>
      <Header />
      <div style={{ marginTop: "8px", textAlign: "center" }}>
        <h3>Add Waypoints</h3>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <WayPoints
                waypoints={state.listItems}
                handleDelete={handleDelete}
                submitted={submitted}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* {listItems.map((ele, ind) => (
        <>
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
              <button className="delete-btn" onClick={() => handleDelete(ind)}>
                DELETE
              </button>
            </div>
          </div>
        </>
      ))} */}
        <>
          <div className="container">
            {/* <RiDragMove2Fill className="icon-drag" />
            <span>Drag</span> */}

            <span style={{ fontWeight: "600" }}>
              Waypoint {state.listItems.length + 1}{" "}
            </span>
            <input
              type="text"
              value={latitude}
              onChange={(e) => handleLatChange(e.target.value)}
              placeholder="Latitude..."
              disabled={submitted}
            />
            <input
              type="text"
              value={longitude}
              onChange={(e) => handleLongChange(e.target.value)}
              placeholder="Longitude..."
              disabled={submitted}
            />
            <input
              type="text"
              value={altitude}
              onChange={(e) => handleAltChange(e.target.value)}
              placeholder="Altitude..."
              disabled={submitted}
            />

            <button
              className="add-btn"
              disabled={
                latitude.length === 0 ||
                longitude.length === 0 ||
                altitude.length === 0
              }
              onClick={() => handleAdd()}
            >
              Add
            </button>
          </div>
        </>

        <div className="submit-container">
          <button
            disabled={state.listItems.length === 0 || loading || submitted}
            id="submit"
            onClick={() => handleSubmit()}
          >
            {loading ? "Loading..." : "Save Waypoints"}
          </button>
        </div>
      </DragDropContext>
      <ToastContainer />
    </div>
  );
}

export default App;
