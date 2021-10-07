import { useState } from "react";
import styled from "styled-components";

const StyledInputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
  h1 {
    color: #1c0c5b;
  }
  div {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    width: 100%;
  }
  div button {
    background-color: #1c0c5b;
    border: 3px solid #3d2c8d;
    border-left: none;
    color: white;
    font-size: 1.2rem;
    height: 100%;
    line-height: 1.2;
    outline: none;
    padding: 0 0.5rem;
  }
  div button:hover {
    background-color: #916bbf;
    border-color: #916bbf;
  }
  div button:active {
    font-size: 1rem;
  }
`;

const StyledInput = styled.input`
  background-color: rgba(0, 0, 0, 0.2);
  border: 3px solid #3d2c8d;
  color: white;
  border-radius: 20px 0 0 20px;
  font-size: 1.2rem;
  height: 100%;
  line-height: 1.2;
  outline: none;
  padding: 5px 15px;
`;

const EndButton = styled.button`
  border-radius: 0 20px 20px 0;
`;

export default function SearchArea({ searchAnime, searchAnimeByGenere }) {
  const [searchText, setSearchText] = useState("");

  const updateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <StyledInputArea>
      <h1>Search Animes</h1>
      <div>
        <StyledInput
          type="text"
          onChange={updateSearchText}
          value={searchText}
        />
        <button
          type="button"
          onClick={() => {
            searchAnime(searchText);
            setSearchText("");
          }}
        >
          Search
        </button>
        <EndButton
          type="button"
          onClick={() => {
            searchAnimeByGenere(searchText);
            setSearchText("");
          }}
        >
          Search by Genere
        </EndButton>
      </div>
    </StyledInputArea>
  );
}
