import React, { useContext } from "react";
import PropTypes from "prop-types";
import { login } from "../utils/network-data";
import LoginInput from "../components/LoginInput";
import { Link } from "react-router-dom";
import lang from "../utils/lang";
import LocaleContext from "../context/LocaleContext";
import ThemeContext from "../context/ThemeContext";
import NotesIllustrationLight from "../assets/images/illustration/notes-illustration-light.svg";
import NotesIllustrationDark from "../assets/images/illustration/notes-illustration-dark.svg";

function LoginPage({ loginSuccess }) {
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);
  const { auth } = lang[locale];

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <div className="notes-illustration-wrap">
        <img
          className="notes-illustration"
          src={
            theme === "light" ? NotesIllustrationLight : NotesIllustrationDark
          }
          alt="notes-illustration"
        />
      </div>
      <div className="login-input-wrap">
        <h2>{auth.login}</h2>
        <LoginInput login={onLogin} />
        <p>
          {auth.dontHaveAccount}{" "}
          <Link to="/register">{auth.registerHere}.</Link>
        </p>
      </div>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
