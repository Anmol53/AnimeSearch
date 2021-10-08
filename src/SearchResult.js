import Card from "./Card";
import styled from "styled-components";

const ResultArea = styled.ul`
  list-style: none;
  display: grid;
  gap: 1rem;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;

export default function SearchResult({
  animes,
  searchAnimeByGenere,
  viewReviews
}) {
  return (
    <ResultArea>
      {animes.map((anime) => (
        <li key={anime.id}>
          <Card
            anime={anime}
            searchAnimeByGenere={searchAnimeByGenere}
            viewReviews={viewReviews}
          />
        </li>
      ))}
    </ResultArea>
  );
}
