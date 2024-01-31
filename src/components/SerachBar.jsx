import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";
import LocaleContext from "../context/LocaleContext";
import lang from "../utils/lang";

function SearchBar({ keyword, keywordChange }) {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="search-bar">
      <FiSearch className="fs-1-5" />
      <input
        type="text"
        placeholder={lang[locale].note.search}
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
