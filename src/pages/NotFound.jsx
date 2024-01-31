import React, { useContext } from "react";
import LocaleContext from "../context/LocaleContext";
import lang from "../utils/lang";

export default function NotFound() {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="page-notfound">
      <h1>404</h1>
      <h3>{lang[locale].notfound}</h3>
    </div>
  );
}
