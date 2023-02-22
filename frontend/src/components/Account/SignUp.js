import React, { useState, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from './message';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import axios from 'axios'

const Signup = () => {
	let navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
		successMsg: false,
		errorMsg: false,
	});
	const {
		username,
		email,
		password,
		password2,
		successMsg,
		errorMsg,
	} = formData;
	/****************************
	 * EVENT HANDLERS
	 ***************************/
	const handleChange = evt => {
		//console.log(evt);
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
			successMsg: '',
			errorMsg: '',
		});
	};

	const handleSubmit = evt => {
		evt.preventDefault();

		// client-side validation
		if (
			isEmpty(username) ||
			isEmpty(email) ||
			isEmpty(password) ||
			isEmpty(password2)
		) {
			setFormData({
				...formData,
				errorMsg: 'All fields are required',
			});
		} else if (!isEmail(email)) {
			setFormData({
				...formData,
				errorMsg: 'Invalid email',
			});
		} else if (!equals(password, password2)) {
			setFormData({
				...formData,
				errorMsg: 'Passwords do not match',
			});
		} else {
			const { username, email, password } = formData;
			const data = { username, email, password };

			setFormData({ ...formData});

				axios.post("/api/auth/signup", data)
				.then(response => {
					console.log('Axios signup success: ', response);
					setFormData({
						username: '',
						email: '',
						password: '',
						password2: '',
						
						successMsg: response.data.successMessage,
					});
					navigate('/login')
				})
				.catch(err => {
					console.log('Axios signup error: ', err);
					setFormData({
						...formData,
						
						errorMsg: err.response.data.errorMessage,
					});
				});
		}

		const confirmEmail = {
			to:email,
			from:'Aquature@gmail.com',
			subject:'Account Creation Success',
			message:'Your account has been created successfully.Thank you for joining with us'
		}
	
		emailjs.send('service_up8w1d8','template_04q541r',confirmEmail,'7m-wDYaixpjQ84rRb')
		.then((result) => {
		  console.log(result.text)
		}, (err) => {
		  console.log(err.text)
		})
	};
	
	

	/****************************
	 * RENDERER
	 ***************************/
	return (
				<div className="d-flex justify-content-center vh-100 align-items-center">
				
					
		<div className="bg-success bg-opacity-50 account-box">
			
		<img  src="../../../images/angel&discusfish.webp" alt=""/>
				
					{successMsg && showSuccessMsg(successMsg)}
					{errorMsg && showErrorMsg(errorMsg)}
					<form className='signup-form' onSubmit={handleSubmit} noValidate>
			{/* username */}
			<div  className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text h-100 rounded-0'>
						<i className='fa fa-user'></i>
					</span>
				</div>
				<input
					name='username'
					value={username}
				
					placeholder='Username'
					type='text'
					onChange={handleChange}
				/>
			</div>
			<br></br>
			{/* email */}
			<div  className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text h-100 rounded-0'>
						<i className='fa fa-envelope'></i>
					</span>
				</div>
				<input
					name='email'
					value={email}
				
					placeholder='Email address'
					type='email'
					onChange={handleChange}
				/>
			</div>
			<br></br>
			{/* password */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text h-100 rounded-0'>
						<i className='fa fa-lock'></i>
					</span>
				</div>
				<input
					name='password'
					value={password}
				
					placeholder='Create password'
					type='password'
					onChange={handleChange}
				/>
			</div>
			<br></br>
			{/* password2 */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text h-100 rounded-0'>
						<i className='fa fa-lock'></i>
					</span>
				</div>
				<input
					name='password2'
					value={password2}
				
					placeholder='Confirm password'
					type='password'
					onChange={handleChange}
				/>
			</div>
			<br></br>
			{/* signup button */}
			<div className='form-group d-flex justify-content-center'>
				<button type='submit' className='btn btn-primary btn-block'>
					Signup
				</button>
			</div>
			{/* already have account */}
			<p className='text-center text-white'>
				Already Have an account? <Link to='/login'>Log In</Link>
			</p>
		</form>
				
				</div>

		</div>
	);
};

export default Signup;