import React, { useContext } from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import { FiLoader } from "react-icons/fi";
import LocaleContext from "../../context/LocaleContext";
import lang from "../../utils/lang";

function NoteList({ loading, notes }) {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="notes-list-wrap">
      {!loading ? (
        notes.length > 0 ? (
          <div className="notes-list">
            {notes.map((note) => (
              <NoteItem key={note.id} id={note.id} {...note} />
            ))}
          </div>
        ) : (
          <div className="notes-list-empty">{lang[locale].note.emptyNotes}</div>
        )
      ) : (
        <div className="notes-list-empty">
          <FiLoader className="fs-1-5" />
        </div>
      )}
    </div>
  );
}

const notePropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired, 
};

NoteList.propTypes = {
  loading: PropTypes.bool.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape(notePropTypes)).isRequired,
};

export default NoteList;
