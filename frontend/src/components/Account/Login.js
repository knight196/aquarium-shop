import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { showErrorMsg } from './message';
import { setAuthentication, isAuthenticated } from '../../helpers/auth';
import {useStateValue} from '../../StateProvider'
import axios from 'axios'
import {toast} from 'react-toastify'
export default function Login() {

	const [{}, dispatch] = useStateValue();

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated() && isAuthenticated().role === 1) {
			navigate('/admin/dashboard');
			
		} else if (isAuthenticated() && isAuthenticated().role === 0) {
			navigate('/user/dashboard');
		}
	}, [navigate]);


  const [formData, setFormData] = useState({
    email: '',
		password: '',
		errorMsg: false,
	});

	

  const {email,password,errorMsg} = formData;

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,errorMsg:''
    })
  }

  const handleSubmit = (e) => {
	e.preventDefault();
	
    if (isEmpty(email) ||isEmpty(password)) {
      setFormData({...formData, errorMsg: 'All fields are required',});
    } 
    else if (!isEmail(email)) {
		setFormData({...formData,errorMsg: 'Invalid email'})
      
	} else{

    const { email, password } = formData;
			const data = { email, password };

			setFormData({ ...formData});

     axios
	  .post("/api/auth/signin", data)
      .then(res => {
        setAuthentication(res.data.token, res.data.user)
   
		if(!res.data.error){
			dispatch({
				type:'SET_USER',
			user:res.data,
			})
			
			toast.success('You have logged in successfully')
		
	
		}
		if(isAuthenticated() && isAuthenticated().role === 1) {
		  console.log('admin dashboard')
		  setTimeout(function(){
			  window.location.href="/"
		  },1500)
		
		}else{
		  console.log('user dashboard')
		  setTimeout(function(){
			  window.location.href="/"
		  }, 1500)
		 
		}
		})
      .catch(err => {
        console.log('signin api function error', err)
        setFormData({...formData,errorMsg: err.response.data.errorMessage})
      })

   

  }

}
  


  return (
   <div className='Login'>
	<div className='row px-3 vh-100'>
		<div className='col-md-5 mx-auto align-self-center'>
		{errorMsg && showErrorMsg(errorMsg)}
		
					<form onSubmit={handleSubmit} noValidate>
		
		{/* email */}
		<div className='form-group input-group'>
			<div className='input-group-prepend'>
				<span className='input-group-text rounded-0 h-100'>
					<i className='fa fa-envelope'></i>
				</span>
			</div>
			<input
				name='email'
				value={email}
				className='form-control'
				placeholder='Email address'
				type='email'
				onChange={handleChange}
			/>
		</div>
		<br></br>
		{/* password */}
		<div className='form-group input-group'>
			<div className='input-group-prepend'>
				<span className='input-group-text rounded-0 h-100'>
					<i className='fa fa-lock'></i>
				</span>
			</div>
			<input
				name='password'
				value={password}
				className='form-control'
				placeholder='Create password'
				type='password'
				onChange={handleChange}
			/>
		</div>
		<br></br>
		<div className='form-group d-flex align-items-center justify-content-center'>
			<button type='submit' className='btn btn-primary btn-block'>
				login
			</button>
		</div>
		{/* already have account */}
		<p className='text-center text-white'>
			Have an account? <Link to='/signup'>Signup</Link>
		</p>
	</form>
	</div>
	</div>
</div>
  )
}
