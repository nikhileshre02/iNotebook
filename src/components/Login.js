import React, { useState } from "react";

function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password, 
      }),
    });
    const json = await response.json();
    console.log(json);
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div class="col-auto">
          <label for="password" class="col-form-label">
            Password
          </label>
        </div>
        <div class="col-auto">
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            aria-describedby="passwordHelpInline"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button class="btn btn-primary" type="submit"></button>
      </form>
    </div>
  );
}

export default Login;
