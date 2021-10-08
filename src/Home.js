import { useEffect, useState } from "react";
import styled from "styled-components";
import Anime from "./Anime";
import SearchArea from "./SearchArea";
import SearchResult from "./SearchResult";

const HomeContainer = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

export default function Home({ user }) {
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
        fetch(`${serverURL}/anime`, { credentials: "include" })
          .then((response) => response.json())
          .then((res) => {
            const sortedReviews = res.todos.sort((a, b) => {
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
              rating: res.rating,
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
    <HomeContainer>
      <SearchArea
        searchAnime={searchAnime}
        searchAnimeByGenere={searchAnimeByGenere}
      />
      {viewingAnime ? (
        <Anime anime={viewingAnime} />
      ) : (
        <>
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
  );
}
