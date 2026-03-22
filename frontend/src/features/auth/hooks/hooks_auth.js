

import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login } from "../auth.api";
import { register } from "../auth.api";
import { logout } from "../auth.api";
import { getme } from "../auth.api";


export const useAuth=()=>{
    const context =useContext(AuthContext)
    const{user,setuser,loading,setloading}=context
    const handlelogin=async ({email,password})=>{
        setloading(true)
        try{
        const data=await login({email,password})
        setuser(data.user)
    return data}
        catch(err){}finally{
        setloading(false)}
    }
    const handleregister=async ({username,email,password})=>{
            setloading(true)
       try{ const data=await register({username,email,password})
        setuser(data.user)
    return data}
        catch(err){}finally{
        setloading(false)}

}
const handlelogout=async()=>{
    setloading(true)
    try{
        const data=await logout()
        setuser(null)
    return data}catch(err){}finally{
        setloading(false)}
}






return {handlelogin,handlelogout,handleregister,user,loading}

}