import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUser } from "../utils/network-data";
import { isObjectEmpty } from "../utils";

export default function TesPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [expired, setExpired] = useState(false);
  const [searchParams] = useSearchParams();
  const [code] = useState(() => {
    return searchParams.get("code") || "";
  });


  useEffect(() => {
    setLoading(true);
    async function getUserByCode() {
      const { data, error, expired } = await getUser(code);
      if (!error) {
        setData(data);
        setExpired(expired);
      }
      setLoading(false);
    }
    getUserByCode();
  }, []);

  console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (expired) {
    return <div>Expired</div>;
  }

  if (isObjectEmpty(data)) {
    return <div>Data tidak ditemukan!</div>;
  }

  return <div>Halo {data.name}</div>;
}
