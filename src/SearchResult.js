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
            id={anime.id}
            title={anime.titles.en || "No Title Available"}
            trailer_url={anime.trailer_url}
            genres={anime.genres || []}
            description={anime.descriptions.en || "No Description Available"}
            rating={anime.rating || 2.5}
            season_year={anime.season_year || "Not available"}
            episodes_count={anime.episodes_count || "Not available"}
            image_url={anime.banner_image}
            searchAnimeByGenere={searchAnimeByGenere}
            viewReviews={viewReviews}
          />
        </li>
      ))}
    </ResultArea>
  );
}
