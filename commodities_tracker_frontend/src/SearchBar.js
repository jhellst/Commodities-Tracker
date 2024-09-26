import { useState } from "react";

/** Searches as user types, using debounce library. */
function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchTermChange(evt) {
    const term = evt.target.value;
    setSearchTerm(term);
    handleSearch(searchTerm);
  }

  return (
    <form>
      <input onChange={handleSearchTermChange}
        value={searchTerm}
        placeholder="Search"
        name="search" />
    </form>
  );
}

export default SearchBar;
