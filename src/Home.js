import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchArea from "./SearchArea";
import SearchResult from "./SearchResult";

const HomeContainer = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

export default function Home({ user }) {
  const BaseURL = "https://api.aniapi.com/v1/anime";

  const [animes, setAnimes] = useState([]);
  const [animeCount, setAnimeCount] = useState(0);

  const searchAnime = (text) => {
    fetch(`${BaseURL}?title=${text}&nsfw=true`)
      .then((r) => r.json())
      .then((r) => {
        if (r.status_code === 200) {
          setAnimes(r.data.documents);
        }
      });
  };

  const searchAnimeByGenere = (text) => {
    if (text !== "") {
      fetch(`${BaseURL}?nsfw=true`)
        .then((r) => r.json())
        .then((r) => {
          if (r.status_code === 200) {
            const genreResult = r.data.documents.filter((doc) =>
              doc.genres.includes(text)
            );
            setAnimes(genreResult);
          }
        });
    }
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
      Showing {animeCount} animes
      {animeCount > 0 && <SearchResult animes={animes} />}
    </HomeContainer>
  );
}
