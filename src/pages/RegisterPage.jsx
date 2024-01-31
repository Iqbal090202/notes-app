import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/network-data";
import RegisterInput from "../components/RegisterInput";
import LocaleContext from "../context/LocaleContext";
import lang from "../utils/lang";

function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const { auth } = lang[locale];

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="login-page">
      <div className="notes-header-register">
        <div className="register-title">{auth.register}</div>
      </div>
      <div className="register-input-wrap">
        <RegisterInput register={onRegisterHandler} />
        <p>
          {auth.backTo} <Link to="/">{auth.login}</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
