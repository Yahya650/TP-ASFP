import React from 'react'
import { useContextApi } from '../../context/ContextApi'

const ParticipantLogin = () => {

    const { login, errors } = useContextApi();

    const handleSubmit = (e) => {
        e.preventDefault()
        login('participant', e.target.email.value, e.target.password.value);
    }

    return (
        <div className="d-flex justify-content-center w-100 mt-5">
            <form onSubmit={handleSubmit}>
            <h1>Login Participant</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" required id="email" pattern='[^\s@]+@[^\s@]+\.[^\s@]+' />
                    {errors?.message && <p className="text-danger">{errors.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" required id="password" pattern='.{8,}' />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default ParticipantLogin
