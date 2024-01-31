import { useState } from "react";

function useInput(defaultValue = "", contentEditable = false) {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (e) => {
    setValue(contentEditable ? e.target.innerHTML : e.target.value);
  };

  return [value, onValueChangeHandler];
}

export default useInput;
