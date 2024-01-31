import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../../utils/index";
import { Link } from "react-router-dom";
import parser from "html-react-parser";

function NoteItem({ id, title, body, createdAt }) {
  return (
    <div className="note-item">
      <Link to={"/notes/" + id}>
        <h3 className="note-item__title">{title}</h3>
        <div className="note-item__body">{parser(body)}</div>
      </Link>
      <div className="note-item__createdAt">{showFormattedDate(createdAt)}</div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
