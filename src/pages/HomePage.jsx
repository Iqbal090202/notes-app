import React from "react";
import NoteList from "../components/Notes/NoteList";
import { getActiveNotes } from "../utils/network-data";
import { FiPlus, FiFolder } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchBar from "../components/SerachBar";
import useNotes from "../hooks/useNotes";

function HomePage() {
  const [notes, loading, keyword, onKeywordChangeHandler] =
    useNotes(getActiveNotes);

  return (
    <>
      <div className="notes-search-wrap">
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <Link to="/archives">
          <FiFolder />
        </Link>
      </div>

      <NoteList loading={loading} notes={notes} />
      <div className="homepage__action">
        <Link to="/notes/new">
          <div className="action">
            <FiPlus />
          </div>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
