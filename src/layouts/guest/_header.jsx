import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const _header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container py-1">
                <NavLink className="navbar-brand " to={'/'}>ASFP</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link mx-3" to={"/"}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mx-3" to={"/table-formation"}>Table Formations</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mx-3" to={"/table-ustilisateur"}>Table Ustilisateur</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mx-3" to={"/formateur/login"}>Formateur Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mx-3" to={"/participant/login"}>Participant Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mx-3" to={"/register"}>Register</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default _header
