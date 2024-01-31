import React, { useContext } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../context/LocaleContext";
import lang from "../utils/lang";

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const { locale } = useContext(LocaleContext);
  const { auth } = lang[locale];

  function onSubmitHandler(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <form className="input-login" onSubmit={onSubmitHandler}>
      <label htmlFor="email">{auth.email}</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">{auth.password}</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
      />
      <button type="submit">{auth.login}</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
