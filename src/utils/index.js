import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

const showFormattedDate = (date) => {
  const { locale } = useContext(LocaleContext);
  const options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(
    locale === "id" ? "id-ID" : "en-EN",
    options
  );
};

const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0
}

export { showFormattedDate, isObjectEmpty };
