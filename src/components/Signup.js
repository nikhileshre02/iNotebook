import React, { useState } from "react";
import {useHistory} from "react-router-dom"

function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const history=useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password,cpassword } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    localStorage.setItem('token',json.authtoken);
    history.pushState("/");
  };

  const onChange = (e) => {
    setcredentials[{ ...credentials, [e.target.name]: e.target.value }];
  };

  return (
    <div>
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <label for="cpassword">Confirm Password</label>
          <input
            type="cpassword"
            name="cpassword"
            class="form-control"
            id="cpassword"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
