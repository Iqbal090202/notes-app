import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useNotes(getNotes) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    async function getNotesData() {
      setLoading(true);
      const { error, data } = await getNotes();
      if (!error) {
        setLoading(false);
        setNotes(data);
      }
    }
    getNotesData();
  }, []);

  async function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return [filteredNotes, loading, keyword, onKeywordChangeHandler];
}

export default useNotes;
