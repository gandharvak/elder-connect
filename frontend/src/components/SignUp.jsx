import {React, useState} from "react";
import signupimg from "../assets/signupimg.jpg"
import '../LoginSignup_Styles.css'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function Signup() {
	const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [locality, setLocality] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleLocalityChange = (event) => {
    setLocality(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
		const url = 'http://localhost:8000/api/v1/user/register';
		const body = {
			name: name,
			emailId: email,
			password: password,
			locality: locality
		};

    console.log(body)
		axios.post(url, body)
			.then(response => {
				console.log('Success:', response.data);
        alert("You can login now!")
				navigate("/")
			})
			.catch(error => {
				console.error('Error:', error);
			});
  };

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
            <input type="text" id="name" placeholder="Enter your name" value={name} onChange={handleNameChange}/>
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" placeholder="Enter your mail" value={email} onChange={handleEmailChange}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div>
            <label htmlFor="name">Age</label>
            <input type="text" id="age" placeholder="Enter your age" value={age} onChange={handleAgeChange}/>
          </div>

          <div>
            <label htmlFor="name">Locality</label>
            <input type="text" id="locality" placeholder="Enter your name" value={locality} onChange={handleLocalityChange} />
          </div>

          </div>
          <button type="submit" onClick={handleSubmit}>Submit</button>

        </form>
      </div>
    </div>
  );
}
