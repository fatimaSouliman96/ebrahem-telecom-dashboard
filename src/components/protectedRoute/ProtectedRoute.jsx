import React, { useEffect, useState } from 'react'
import { permissions } from '../../constants/data'

export default function ProtectedRoute({ children }) {

    

    const [allowedRole, setAllowedRole] = useState()
    const user = JSON.parse(localStorage.getItem('user'))
    const role = user?.roles[0].name
    const userPermissions = JSON.parse(localStorage.getItem('user')).permissions

    const setPermissions = () => {
        userPermissions.forEach(ele => {
            permissions.forEach(e => {
                if(user.is_agent == true){
                     setAllowedRole(role)
                } else if (ele.name === e.en) {
                    setAllowedRole(role)
                }
            })
        })
     
    }
    useEffect(() => {
        setPermissions()
    }, [children])


    if (allowedRole == role) {
        return children
    } else {
        return <div className='flex items-center justify-center text-5xl font-extrabold'>غير مسموح به</div>
    }
}

