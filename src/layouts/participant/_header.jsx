import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useContextApi } from '../../context/ContextApi';

const _header = () => {

  const { logout } = useContextApi();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container py-1">
        <NavLink className="navbar-brand " to={'/'}>ASFP</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-5">
              <NavLink className="nav-link" to={"/participant"}>Home</NavLink>
            </li>
            <li className="nav-item mx-5">
              <NavLink className="nav-link" to={"/participant/table-formation"}>Table Formations</NavLink>
            </li>
            <li className="nav-item mx-5">
              <button className="btn btn-danger" onClick={() => logout()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default _header
