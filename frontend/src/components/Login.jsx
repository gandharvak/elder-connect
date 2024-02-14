import { React, useState } from 'react';
import loginimg from "../assets/loginimg.jpg"
import '../LoginSignup_Styles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const apiUrl = 'http://localhost:8000/api/v1/user/';

		// Define the request body
		const requestBody = {
			emailId: email,
			password: password
		};

		console.log(requestBody)

		// Make the POST request
		axios.post(apiUrl, requestBody)
			.then(response => {
				// Handle the response here
				console.log('Success:', response.data);
				localStorage.setItem("token", response.data.token);
				navigate("/")
			})
			.catch(error => {
				// Handle any errors here
				console.error('Error:', error);
			});
	}

	return (
		<div className="wrapper signIn">
			<div className="illustration">
				<img src={loginimg} alt="loginimg" />
			</div>
			<div className="form">
				<div className="heading">LOGIN</div>
				<form>
					<div>
						<label htmlFor="email">Email</label>
						<input type="email" id="email" placeholder="Enter your email" onChange={handleEmailChange} value={email} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" placeholder="Enter you password" onChange={handlePasswordChange} value={password} />
					</div>
					<button type="submit" onClick={handleSubmit}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
