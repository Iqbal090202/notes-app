import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import NoteInput from "../components/Notes/NoteInput";

function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    const { error } = await addNote(note);
    if (!error) {
      navigate("/");
    }
  }

  function handleBack() {
    navigate("/");
  }

  return <NoteInput addNote={onAddNoteHandler} onBack={handleBack} />;
}

export default AddPage;
