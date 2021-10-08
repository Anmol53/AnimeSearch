import { useState } from "react";
import styled from "styled-components";

const AddReviewContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    min-width: 350px;
    width: 80%;
    min-height: 10rem;
    padding: 10px;
    border-left: 6px solid #095484;
    background-color: #d0e2bc;
    font: 1.4em/1.6em cursive;
    color: #095484;
  }

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  label {
    background-color: #916bbf;
    border: 3px solid #916bbf;
    border-radius: 10px 0 0 10px;
    font-size: 1.2rem;
    height: 2rem;
    line-height: 1.8rem;
    text-align: center;
    color: white;
    padding: 0 10px;
  }

  input {
    background-color: rgba(0, 0, 0, 0);
    border: 3px solid #916bbf;
    color: white;
    border-radius: 0 10px 10px 0;
    font-size: 1.2rem;
    line-height: 2rem;
    height: 2rem;
    outline: none;
    padding: 0 10px;
  }

  button {
    outline: none;
    border: none;
    margin: 0 1rem;
    border-radius: 10px;
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #916bbf;
    color: white;
    font-weight: 600;
  }

  button:hover:enabled {
    background-color: #ff0040;
  }

  button:active:enabled {
    background-color: #ff4d79;
  }
`;

export default function AddReview({ post }) {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(undefined);
  return (
    <AddReviewContainer>
      <textarea
        placeholder="Type your review here."
        onChange={(e) => setNewReview(e.target.value)}
        value={newReview}
      />
      <div>
        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          onChange={(e) => setNewRating(e.target.value)}
          value={newRating}
        />
        <button
          type="button"
          onClick={() => {
            post(newReview, newRating);
            setNewReview("");
            setNewRating(undefined);
          }}
        >
          Post
        </button>
      </div>
    </AddReviewContainer>
  );
}
