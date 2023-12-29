import React, { useEffect, useState } from 'react'
import { axiosClient } from '../api/axiosClient';
import { useContextApi } from '../context/ContextApi';
import { Link } from 'react-router-dom';

const TableUtilisateur = () => {

    const { fetchUtilisateurs, utilisateurs } = useContextApi();
    useEffect(() => {
        fetchUtilisateurs()
    }, [])

    return (
        <>

            {utilisateurs ? <table className="table container mt-5 table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Role</th>
                        <th scope="col">Formations inscrites</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        utilisateurs.map((utilisateur) => (
                            <tr key={utilisateur.id}>
                                <td>{utilisateur.id}</td>
                                <td>{utilisateur.nom}</td>
                                <td>{utilisateur.role}</td>
                                <td>{utilisateur.formations_inscrites?.map((formation) => <Link to={"/formation/" + formation}>{formation + " "}</Link>)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> : <h1 className='text-center mt-5'>Loading...</h1>}
        </>
    )
}

export default TableUtilisateur
