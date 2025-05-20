import React, { Children } from 'react'
import { useAuth } from '../authContext/AuthContex'
import { useNavigate } from 'react-router-dom';

function PrivateRoute({children , role}) {
    const Navigate = useNavigate();
    const {user} = useAuth();
    if(!user){
        return <Navigate to="/login"/>
    }

    if(role && user.role !== role){
        return <Navigate to="/unauthorization" />
    }
  return (
    children
  )
}

export default PrivateRoute