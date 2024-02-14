import React from "react";
import signupimg from "../assets/signupimg.jpg"

export default function Signup() {
  return (
    <div className="wrapper signUp">
      <div className="illustration">
        <img src= {signupimg} alt="illustration" />
      </div>
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div>
            <label htmlFor="name">E-Mail</label>
            <input type="text" id="name" placeholder="Enter your mail" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
            />
            <div>
            <label htmlFor="name">Age</label>
            <input type="text" id="age" placeholder="Enter your age" />
          </div>

          <div>
            <label htmlFor="name">Locality</label>
            <input type="text" id="locality" placeholder="Enter your name" />
          </div>

          </div>
          <button type="submit">Submit</button>
          <h2 align="center" class="or">
            OR
          </h2>
        </form>
        <p>
          Have an account ? Login 
        </p>
      </div>
    </div>
  );
}
