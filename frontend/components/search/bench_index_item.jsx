import React from "react";
import { withRouter } from "react-router-dom";

const BenchIndexItem = ({ bench, history }) => {
  const handleClick = () => {
    const benchId = bench.id;
    history.push(`/benches/${benchId}`);
  };

  return (
    <div onClick={handleClick} className="bench-index-item-container">
      <img
        src={bench.pictures[0]}
        alt="picture loading..."
        width="175"
        height="190"
      />
      <div className="bench-description">
        <h1>{bench.description}</h1>
        <p>longitude: {bench.lng}</p>
        <p>latitude: {bench.lat}</p>
        <p>seats: {bench.seating}</p>
      </div>
    </div>
  );
};

export default withRouter(BenchIndexItem);
