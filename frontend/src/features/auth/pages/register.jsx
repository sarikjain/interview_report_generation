import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/hooks_auth'
import { useState } from 'react'


const Register = () => {
const navigate=useNavigate()
const {loading,handleregister}=useAuth()
const [username, setusername ]= useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const handlesubmit=async(e)=>{
    e.preventDefault()
   await  handleregister({username,email,password})
    navigate("/")

} 
if(loading){
    return(<main><h1>Loading........</h1></main>)
}
  return (
   <main id="main">
<form id="form" onSubmit={handlesubmit}>


<div id="register">Register</div>
<hr></hr>
<div className="inputgroup" >
    <label className='label'>Username:</label>
    <input onChange={(e)=>{setusername(e.target.value)
    }}className="input"type="username"  placeholder='Enter Username'/>
</div>
<div className="inputgroup" id="frst">
    <label className='label'>Email:</label>
    <input onChange={(e)=>{setemail(e.target.value)}}className="input"type="email"  placeholder='Enter Email Address'/>
</div>
<div className='inputgroup' id="second"> 
    <label className='label'>Password:</label>
    <input onChange={(e)=>{setpassword(e.target.value)}} className="input"type="password"  placeholder='Enter password'/>

</div>
<button id="button">Register</button>
<hr id="spe"></hr>

<p  id="close">Already have an Account?<Link id="link" to={"/login"}>Login now</Link></p>












</form>








    </main>

  )
}
export default Register



