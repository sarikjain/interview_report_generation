import React,{useState} from 'react'
import "../pages/auth.style.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/hooks_auth'

 const Login = () => {

const {loading,handlelogin}=useAuth()
const Navigate=useNavigate()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


const handlesubmit=async(e)=>{
    e.preventDefault()
   const res = await handlelogin({ email, password })
  console.log("RES:", res)

  if (res) {
    console.log("Navigating...")
    Navigate("/")
  }
}
if(loading)
{
    return(<main><h1>Loading........</h1></main>)
}
  return (
    <main id="main">
<form id="form" onSubmit={handlesubmit}>


<div id="login">Login</div>
<hr></hr>
<div className="inputgroup" id="frst">
    <label className='label'>Email:</label>
    <input onChange={(e)=>{setEmail(e.target.value)}}className="input"type="email"  placeholder='Enter Email Address'/>
</div>
<div className='inputgroup' id="second"> 
    <label className='label'>Password:</label>
    <input onChange={(e)=>{setPassword(e.target.value)}}className="input"type="password"  placeholder='Enter password'/>

</div>
<button id="button">Login</button>
<hr id="spe"></hr>

<p  id="close">Dont have any Account?<Link id="link"to={"/register"}>Register now</Link></p>












</form>








    </main>

  )
}
export default Login
