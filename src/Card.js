import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  position: relative;
  height: 100%;
  min-height: 150px;
  max-width: 600px;
  border-radius: 20px;
  box-shadow: 2px 2px 20px 2px rgba(0, 0, 0, 0.25),
    -2px -2px 20px 2px rgba(0, 0, 0, 0.22);
  transition: 0.4s;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  &:hover {
    transform: scale(0.95, 0.95);
  }
`;

const DiluteBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  border-radius: 20px;
  color: white;
  padding: 2rem;
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
  cursor: pointer;
`;

const StyledButton = styled.button`
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background-color: #3d2c8d;
  color: white;
  font-weight: 600;

  &:hover {
    background-color: #916bbf;
  }

  &:active {
    background-color: #c996cc;
  }
`;

export default function Card({
  id,
  title,
  trailer_url,
  genres,
  description,
  rating,
  season_year,
  episodes_count,
  image_url,
  searchAnimeByGenere,
  viewReviews
}) {
  const Rating = styled.span`
    background: linear-gradient(
      90deg,
      yellow ${rating * 20}%,
      rgba(255, 255, 255, 0.3) 1%
    );
    background-clip: text;
    font-size: 1.2rem;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;

  if (description.length > 150) {
    description = description.substring(0, 150) + "...";
  }
  return (
    <StyledCard style={{ backgroundImage: `url(${image_url})` }}>
      <DiluteBackground>
        <h1>{title}</h1>
        <p>{description}</p>
        <TrailerButton
          href={trailer_url}
          target="_blank"
          className={!trailer_url && "disabled"}
          title={trailer_url ? "Open Trailer" : "Trailer not available"}
        >
          Trailer Link
        </TrailerButton>
        <p>
          Rating:<Rating>★★★★★</Rating>
        </p>
        <p>Season Year: {season_year}</p>
        <p>Number of Episodes: {episodes_count}</p>
        <p>Genres: </p>
        <ul>
          {genres.map((genre, idx) => {
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
                <span onClick={() => searchAnimeByGenere(genre)}>{genre}</span>
              </Badge>
            );
          })}
        </ul>
        <StyledButton type="button" onClick={() => viewReviews(id)}>
          View Reviews
        </StyledButton>
      </DiluteBackground>
    </StyledCard>
  );
}
