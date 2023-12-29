import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import _header from './_header';

const Index = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === 'Participant') {
            navigate('/participant');
        } else if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === 'Formateur') {
            navigate('/formatuer');
        }
    }, [])
    return (
        <div>
            <_header />
            <Outlet />
        </div>
    )
}

export default Index
