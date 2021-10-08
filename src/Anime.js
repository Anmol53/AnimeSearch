import { useState } from "react";
import styled from "styled-components";
import AddReview from "./AddReview";

const StyledContainer = styled.div``;
const AboutContainer = styled.div`
  max-width: 100vw;
  overflow: hidden;
  img {
    max-width: 100%;
  }
  ul {
    width: 90%;
    max-width: 500px;
  }
`;

const ReviewsContainer = styled.div`
  padding: 2rem 1rem;
  h1 {
    font-size: 1.2rem;
    color: #1c0c5b;
  }
  ul {
    list-style: none;
  }
  li {
    padding: 0.5rem;
    border: 3px solid #916bbf;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  h2 {
    font-size: 1.5rem;
    color: #1c0c5b;
  }
  p {
    color: #3d2c8d;
    font-size: 1.2rem;
  }
  span {
    color: #916bbf;
  }
`;

const TrailerButton = styled.a`
  display: inline-block;
  text-decoration: none;
  background-color: #222831;
  border: 2px solid #393e46;
  color: #00adb5;
  margin: 0.2rem 0;
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  &.disabled {
    opacity: 0.5;
    color: red;
    border-color: red;
    cursor: not-allowed;
  }
`;

const Badge = styled.li`
  list-style: none;
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border: 2px solid black;
  border-radius: 10px;
  margin: 2px 5px 2px 0px;
  font-size: 0.7rem;
  font-weight: 700;
`;

export default function Anime({ anime }) {
  const Rating = styled.span`
    background: linear-gradient(
      90deg,
      yellow ${anime.rating * 20}%,
      rgba(255, 255, 255, 0.3) 1%
    );
    background-clip: text;
    font-size: 1.2rem;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;

  const serverURL = "https://anime-search-backend.herokuapp.com";

  const [currReviews, setCurrReviews] = useState(anime.reviews);

  // Add Item to List
  const add = (newReview, newRating) => {
    if (newReview !== "" && newRating) {
      fetch(`${serverURL}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: newReview,
          rating: newRating,
          anime_id: anime.id
        }),
        credentials: "include"
      })
        .then((response) => response.json())
        .then((result) => {
          const temp = [...currReviews];
          temp.push(result);
          setCurrReviews(temp);
        });
    }
  };

  return (
    <StyledContainer>
      <AboutContainer>
        <img src={anime.image_url} alt={`Banner for ${anime.title}`} />
        <h1>{anime.title}</h1>
        <p>{anime.description}</p>
        <TrailerButton
          href={anime.trailer_url}
          target="_blank"
          className={!anime.trailer_url && "disabled"}
          title={anime.trailer_url ? "Open Trailer" : "Trailer not available"}
        >
          Trailer Link
        </TrailerButton>
        <p>
          Rating:<Rating>★★★★★</Rating>
        </p>
        <p>Season Period: {anime.season_period}</p>
        <p>Season Year: {anime.season_year}</p>
        <p>Number of Episodes: {anime.episodes_count}</p>
        <p>Episode Duration: {anime.episode_duration}</p>
        <p>Score: {anime.score}</p>
        <p>Genres: </p>
        <ul>
          {anime.genres.map((genre, idx) => {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            while (randomColor.length < 6) {
              randomColor = 8 + randomColor;
            }
            return (
              <Badge
                key={`${genre}_${idx}`}
                style={{
                  backgroundColor: `#${randomColor}60`,
                  borderColor: `#${randomColor}`,
                  color: `#${randomColor}`
                }}
              >
                {genre}
              </Badge>
            );
          })}
        </ul>
      </AboutContainer>
      <ReviewsContainer>
        <h1>Reviews</h1>
        <ul>
          {currReviews.map((review, idx) => (
            <li>
              <h2>{review.user_name}</h2>
              <p>{review.description}</p>
              <span>Rating: {review.rating}</span>
            </li>
          ))}
        </ul>
      </ReviewsContainer>
      <AddReview post={add} />
    </StyledContainer>
  );
}
