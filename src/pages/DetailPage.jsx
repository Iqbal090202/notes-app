import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data";
import { showFormattedDate } from "../utils";
import { FiArchive, FiArrowLeft, FiLoader, FiTrash2 } from "react-icons/fi";
import parser from "html-react-parser";

function DetailPage() {
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getNoteData() {
      setLoading(true);
      const { error, data } = await getNote(id);
      if (!error) {
        setLoading(false);
        setNote(data);
      }
    }
    getNoteData();
  }, []);

  async function onToggleArchive(id, archived) {
    archived ? await unarchiveNote(id) : await archiveNote(id);
    navigate("/");
  }

  async function onDelete(id) {
    await deleteNote(id);
    navigate("/");
  }

  function onBack() {
    navigate("/");
  }

  if (loading) {
    return (
      <div className="notes-list-empty">
        <FiLoader className="fs-1-5" />
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-page__title">{note.title}</div>
      <div className="detail-page__createdAt">
        {showFormattedDate(note.createdAt)}
      </div>
      <div className="detail-page__body">{parser(note.body)}</div>
      <div className="detail-page__action">
        <button className="action" onClick={onBack}>
          <FiArrowLeft />
        </button>
        <button
          className="action"
          type="button"
          onClick={() => onToggleArchive(id, note.archived)}
        >
          <FiArchive />
        </button>
        <button className="action" type="button" onClick={() => onDelete(id)}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
