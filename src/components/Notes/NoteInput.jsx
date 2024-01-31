import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import useInput from "../../hooks/useInput";
import LocaleContext from "../../context/LocaleContext";
import lang from "../../utils/lang";

function NoteInput({ addNote, onBack }) {
  const { locale } = useContext(LocaleContext);
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("", true);

  function onSubmitEventHandler(e) {
    e.preventDefault();
    addNote({ title, body });
  }

  return (
    <form className="add-new-page__input" onSubmit={onSubmitEventHandler}>
      <input
        type="text"
        placeholder={lang[locale].note.title}
        className="add-new-page__input__title"
        value={title}
        onChange={onTitleChange}
        autoFocus
      />
      <div
        className="add-new-page__input__body"
        data-placeholder={lang[locale].note.body}
        contentEditable
        onInput={onBodyChange}
      />
      <div className="add-new-page__action">
        <button className="action" onClick={onBack}>
          <FiArrowLeft />
        </button>
        <button type="submit" className="action">
          <FiCheck />
        </button>
      </div>
    </form>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default NoteInput;
