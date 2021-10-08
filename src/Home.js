import { useEffect, useState } from "react";
import styled from "styled-components";
import Anime from "./Anime";
import SearchArea from "./SearchArea";
import SearchResult from "./SearchResult";

const UserInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.2rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: #1c0c5b;
    font-size: 1.2rem;
  }

  button {
    outline: none;
    border: none;
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

  button.back {
    transform: rotateY(180deg);
    padding: 0 0.5rem;
    font-size: 1.5rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HomeContainer = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

export default function Home({ user, logout }) {
  const BaseURL = "https://api.aniapi.com/v1/anime";
  const serverURL = "https://anime-search-backend.herokuapp.com";

  const [animes, setAnimes] = useState([]);
  const [animeCount, setAnimeCount] = useState(0);
  const [searchedMessage, setSearchedMessage] = useState("");
  const [viewingAnime, setViewingAnime] = useState(undefined);

  const searchAnime = (text) => {
    setSearchedMessage(`for '${text}'`);
    fetch(`${BaseURL}?title=${text}&nsfw=true`)
      .then((r) => r.json())
      .then((r) => {
        if (r.status_code === 200) {
          updateAnimeObject(r.data.documents);
        }
      });
  };

  const searchAnimeByGenere = (text) => {
    setSearchedMessage(`for '${text}' genere`);
    if (text !== "") {
      fetch(`${BaseURL}?nsfw=true`)
        .then((r) => r.json())
        .then((r) => {
          if (r.status_code === 200) {
            const genreResult = r.data.documents.filter((doc) =>
              doc.genres.includes(text)
            );
            updateAnimeObject(genreResult);
          }
        });
    }
  };

  async function updateAnimeObject(fetchedAnimes) {
    const updatedAnimes = await Promise.all(
      fetchedAnimes.map((anime, idx) =>
        fetch(`${serverURL}/anime/${anime.id}`, { credentials: "include" })
          .then((response) => response.json())
          .then((res) => {
            const sortedReviews = res.reviews.sort((a, b) => {
              const aDate = new Date(a.creationTime).valueOf();
              const bDate = new Date(b.creationTime).valueOf();
              return aDate - bDate;
            });
            return {
              id: anime.id,
              title: anime.titles.en || "No Title Available",
              trailer_url: anime.trailer_url,
              genres: anime.genres,
              description: anime.descriptions.en || "No Description Available",
              rating: res.overallRating,
              season_year: anime.season_year,
              episodes_count: anime.episodes_count,
              image_url: anime.banner_image,
              season_period: anime.season_period,
              episode_duration: anime.episode_duration,
              score: anime.season_year,
              reviews: sortedReviews
            };
          })
      )
    );
    setAnimes(updatedAnimes);
  }

  const viewReviews = (id) => {
    setViewingAnime(animes.filter((anime) => anime.id === id)[0]);
  };

  useEffect(() => {
    setAnimeCount(animes.length);
  }, [animes]);

  return (
    <>
      <UserInfo>
        <button
          className="back"
          onClick={() => {
            setViewingAnime(undefined);
          }}
          disabled={!viewingAnime}
        >
          ➤
        </button>
        <p>Hi {user.user_name}!</p>
        <button onClick={logout}>Logout</button>
      </UserInfo>

      <HomeContainer>
        {viewingAnime ? (
          <Anime anime={viewingAnime} />
        ) : (
          <>
            <SearchArea
              searchAnime={searchAnime}
              searchAnimeByGenere={searchAnimeByGenere}
            />
            <p>
              Showing {animeCount} animes {searchedMessage}
            </p>
            {animeCount > 0 && (
              <SearchResult
                animes={animes}
                searchAnimeByGenere={searchAnimeByGenere}
                viewReviews={viewReviews}
              />
            )}
          </>
        )}
      </HomeContainer>
    </>
  );
}
