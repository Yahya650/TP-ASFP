import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import _header from './_header';

const IndexParticipant = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate('/formateur/login');
    }
  }, [])

  return (
    <div>
      <_header />
      <Outlet />
    </div>
  )
}

export default IndexParticipant
