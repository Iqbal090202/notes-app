import React, { useContext } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../context/LocaleContext";
import lang from "../utils/lang";

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const { locale } = useContext(LocaleContext);
  const { auth } = lang[locale];

  function onSubmitHandler(e) {
    e.preventDefault();

    if (confirmPassword !== password) {
      return alert("Password and confirm password must be same.");
    }

    register({ name, email, password });
  }

  return (
    <form className="input-register" onSubmit={onSubmitHandler}>
      <label htmlFor="name">{auth.name}</label>
      <input type="text" id="name" value={name} onChange={onNameChange} />
      <label htmlFor="email">{auth.email}</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">{auth.password}</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
      />
      <label htmlFor="confirmPassword">{auth.confirmPassword}</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <button type="submit">{auth.register}</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
