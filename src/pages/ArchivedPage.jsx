import React from "react";
import NoteList from "../components/Notes/NoteList";
import { getArchivedNotes } from "../utils/network-data";
import { FiHome, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchBar from "../components/SerachBar";
import useNotes from "../hooks/useNotes";

function ArchivedPage() {
  const [notes, loading, keyword, onKeywordChangeHandler] =
    useNotes(getArchivedNotes);

  return (
    <>
      <div className="notes-search-wrap">
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <Link to="/">
          <FiHome />
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

export default ArchivedPage;
