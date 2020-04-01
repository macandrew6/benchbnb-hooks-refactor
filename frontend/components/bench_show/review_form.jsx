import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const ReviewForm = ({ createReview, match, history }) => {
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);

  const navigateToBenchShow = () => {
    const url = `/benches/${match.params.benchId}`;
    history.push(url);
  };

  const update = field => {
    return e => {
      switch (field) {
        case "rating":
          return setRating(e.target.value);
        case "body":
          return setBody(e.target.value);
        default:
          return;
      }
    };
  };

  const handleSubmitReview = e => {
    e.preventDefault();
    const benchId = parseInt(match.params.benchId);
    const review = Object.assign({}, { body, rating }, { bench_id: benchId });
    createReview(review);
    navigateToBenchShow();
  };

  return (
    <div>
      <form onSubmit={handleSubmitReview}>
        Rating:
        <br />
        <input type="number" value={rating} onChange={update("rating")} />
        <br />
        Comment:
        <br />
        <textarea
          type="text"
          cols="30"
          rows="10"
          value={body}
          onChange={update("body")}
          placeholder="write a review here"
        />
        <br />
        <button type="submit">Submit Review</button>
      </form>
      <button onClick={navigateToBenchShow}>Cancel</button>
    </div>
  );
};

export default withRouter(ReviewForm);
