import React, { useState } from "react";

const SessionForm = ({ formType, navLink, errors, processForm }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const update = field => {
    return e => {
      switch (field) {
        case "password":
          return setPassword(e.target.value);
        case "username":
          return setUserName(e.target.value);
        default:
          return;
      }
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = Object.assign({}, { username, password });
    processForm(user);
  };

  const renderErrors = () => {
    return (
      <ul>
        {errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="session-form-container">
      <h2>Welcome to BenchBnB!</h2>
      <form className="session-form" onSubmit={handleSubmit}>
        <br />
        <div className="login-form">
          <label>
            Username:
            <br />
            <input type="text" value={username} onChange={update("username")} />
          </label>
          <br />
          <label>
            Password:
            <br />
            <input
              type="password"
              value={password}
              onChange={update("password")}
            />
          </label>
          {renderErrors()}
          <br />
          <h5>
            Please {formType} or {navLink}
          </h5>
          <br />
          <button className="submit-button" type="submit">
            {" "}
            {formType}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;
