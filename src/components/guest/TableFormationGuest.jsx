import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../api/axiosClient'
import { useContextApi } from '../../context/ContextApi';
import { Select } from '@chakra-ui/react';

const TableFormationGuest = () => {

    const { fetchFormations, formations, searchByDomaine, searchByNiveau } = useContextApi();
    const [searchByValue, setSearchByValue] = useState(null);

    useEffect(() => {
        fetchFormations()
    }, [])

    return (
        <>

            <div className='d-flex flex-column align-items-center w-100'>

                <div className='mt-3 d-flex gap-2'>
                    <div className='d-flex gap-3 align-items-center justify-content-center'>
                        <Select onChange={(e) => !e.target.value ? setSearchByValue(null) : setSearchByValue(searchByDomaine(e.target.value))} name='domaine' variant='filled' placeholder='Domaine'>
                            <option value="Management">Management</option>
                            <option value="Informatique">Informatique</option>
                            <option value="Design">Design</option>
                            <option value="Commerce">Commerce</option>
                        </Select>
                        <Select onChange={(e) => !e.target.value ? setSearchByValue(null) : setSearchByValue(searchByNiveau(e.target.value))} name='niveau' variant='filled' placeholder='Niveau'>
                            <option value="Débutant">Débutant</option>
                            <option value="Intermédiaire">Intermédiaire</option>
                            <option value="Avance">Avance</option>
                            <option value="Expert">Expert</option>
                            <option value="Master">Master</option>
                            <option value="PhD">PhD</option>
                            <option value="Doctorat">Doctorat</option>
                        </Select>
                    </div>
                </div>

                {searchByValue && <table className="table container mt-5 table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Domaine</th>
                            <th scope="col">Niveau</th>
                            <th scope="col">Descreption</th>
                            <th scope="col">Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchByValue.map((formation) => (
                                <tr key={formation.id}>
                                    <td>{formation.id}</td>
                                    <td>{formation.titre}</td>
                                    <td>{formation.domaine}</td>
                                    <td>{formation.niveau}</td>
                                    <td>{formation.description}</td>
                                    <td>{formation.disponible ? <div><span className="badge bg-success">Disponible</span></div> : <div><span className="badge bg-danger">Indisponible</span></div>}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>}

                {formations && searchByValue === null && <table className="table container mt-5 table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Domaine</th>
                            <th scope="col">Niveau</th>
                            <th scope="col">Descreption</th>
                            <th scope="col">Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formations.map((formation) => (
                                <tr key={formation.id}>
                                    <td>{formation.id}</td>
                                    <td>{formation.titre}</td>
                                    <td>{formation.domaine}</td>
                                    <td>{formation.niveau}</td>
                                    <td>{formation.description}</td>
                                    <td>{formation.disponible ? <div><span className="badge bg-success">Disponible</span></div> : <div><span className="badge bg-danger">Indisponible</span></div>}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>}
            </div>


        </>
    )
}

export default TableFormationGuest
