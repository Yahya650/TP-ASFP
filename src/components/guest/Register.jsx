import React, { useState } from 'react'
import { useContextApi } from '../../context/ContextApi'
import { Select } from '@chakra-ui/react'

const Register = () => {

    const { register, fetchFormations, formations } = useContextApi()

    const [fomationsChoose, setFomationsChoose] = useState([])

    return (
        <div className='d-flex justify-content-center w-100 mt-5'>
            <form onSubmit={(e) => {
                e.preventDefault();
                e.target.role.value === 'formateur' ?
                    register(e.target.role.value, { id: Math.floor(Math.random() * 100) + 1, email: e.target.email.value, password: e.target.password.value, nom: e.target.nom.value, role: 'formateur', formations_enseignees: fomationsChoose }) :
                    e.target.role.value === 'participant' && register(e.target.role.value, { id: Math.floor(Math.random() * 100) + 1, email: e.target.email.value, password: e.target.password.value, role: 'participant', nom: e.target.nom.value, formations_inscrites: fomationsChoose });
                setFomationsChoose([]);
            }}>
                <h1>Register</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Nom</label>
                    <input type="text" className="form-control" required id="nom" />
                </div>
                <div className="mb-3">
                    <Select onChange={fetchFormations} name='role' variant='filled' placeholder='Role'>
                        <option value="formateur">formateur</option>
                        <option value="participant">participant</option>
                    </Select>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" required id="email" pattern='[^\s@]+@[^\s@]+\.[^\s@]+' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" required id="password" pattern='.{8,}' />
                </div>
                <div className="mb-3">
                    {
                        formations?.length > 0 && formations.map(formation => <div key={formation.id}><input onChange={(e) => e.target.checked && setFomationsChoose([...fomationsChoose, Number(e.target.value)])} type='checkbox' name='formations' className='form-check-input' value={formation.id} id={formation.id} /><label htmlFor={formation.id} className="form-check-label">{formation.titre}</label></div>)
                    }
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Register
