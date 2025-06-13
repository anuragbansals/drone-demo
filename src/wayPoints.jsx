import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { GiHamburgerMenu } from "react-icons/gi";

function WayPointItem({ item, ind, handleDelete, submitted }) {
  return (
    <Draggable draggableId={item.id} index={ind}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          key={ind}
          className="container"
        >
          {/* <div key={ind} className="container"> */}
          <span className="drag-container">
            <GiHamburgerMenu color="#000" />
          </span>

          <span style={{ fontWeight: "600" }}>Waypoint {ind + 1}</span>
          <input
            disabled
            type="text"
            value={item.latitude}
            placeholder="Latitude..."
          />
          <input
            type="text"
            disabled
            value={item.longitude}
            placeholder="Longitude..."
          />
          <input
            type="text"
            disabled
            value={item.altitude}
            placeholder="Altitude..."
          />
          <button
            disabled={submitted}
            className="delete-btn"
            onClick={() => handleDelete(ind)}
          >
            Delete
          </button>
        </div>
        // </div>
      )}
    </Draggable>
  );
}

const WayPoints = ({ waypoints, handleDelete, submitted }) => {
  return (
    <>
      {waypoints.map((item, index) => (
        <WayPointItem
          key={item.id}
          item={item}
          ind={index}
          handleDelete={handleDelete}
          submitted={submitted}
        />
      ))}
    </>
  );
};
export default React.memo(WayPoints);
