import React, { Children } from 'react'
import { useAuth } from '../hooks/hooks_auth'
import { Navigate } from 'react-router'

export const Protected = ({children}) => {
 
const{loading,user}=useAuth()
if(loading)
{
    return(<main><h1>loading.......</h1></main>)
}


if(!user){
return <Navigate to={"/login"}/>
}










return children







}
