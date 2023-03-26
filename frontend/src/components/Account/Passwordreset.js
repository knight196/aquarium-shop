import {useEffect} from 'react'

export default function Passwordreset() {

    function handleChange(){

    }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form onSubmit={handleChange} noValidate className="text-center bg-secondary bg-opacity-50 w-50 h-50 p-2 d-flex flex-column justify-content-center align-items-center">

    <p>New Password</p>
    <input type="text" placeholder='Enter your New Password' className="px-2 py-1"/>

    <p>Confirm Password</p>
    <input type="text" placeholder="Confirm new password" className="px-2 py-1"/>

<br></br>
<button className="border-0 px-2 py-1 my-1">Confirm</button>

      </form>
    </div>
  )
}
