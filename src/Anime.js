import { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div``;
const AboutContainer = styled.div``;
const ReviewsContainer = styled.div``;
const AddReviewContainer = styled.div``;

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

  const [reviews, setReviews] = useState([
    {
      user_name: "anmol",
      description: "as svwlm vlakv dasl lkads v",
      rating: "3"
    }
  ]);

  return (
    <StyledContainer>
      <AboutContainer>
        <img src={anime.banner_image} alt={`Banner for ${anime.title}`} />
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
          {anime.generes.map((genre, idx) => {
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
        <ul>
          {reviews.map((review, idx) => (
            <li>
              <h2>{review.user_name}</h2>
              <p>{review.description}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      </ReviewsContainer>
      <AddReviewContainer>
        <label>Description</label>
        <textarea />
        <label>Rating</label>
        <input type="range" min="1" max="5" />
        <button type="button">Post</button>
      </AddReviewContainer>
    </StyledContainer>
  );
}
