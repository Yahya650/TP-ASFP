import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../api/axiosClient'
import { useContextApi } from '../../context/ContextApi';
import { Link } from 'react-router-dom';
import { Select } from '@chakra-ui/react'

const TableFormation = () => {

    const { fetchFormations, formations, user, deleteFormation, addFormation, searchByDomaine, searchByNiveau } = useContextApi();

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
                    <div>
                        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add
                        </button>
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
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchByValue.filter((formation) => user.formations_enseignees.includes(formation.id)).map((formation) => (
                                <tr key={formation.id}>
                                    <td>{formation.id}</td>
                                    <td>{formation.titre}</td>
                                    <td>{formation.domaine}</td>
                                    <td>{formation.niveau}</td>
                                    <td>{formation.description}</td>
                                    <td>{formation.disponible === "true" || formation.disponible === true ? <div><span className="badge bg-success">Disponible</span></div> : <div><span className="badge bg-danger">Indisponible</span></div>}</td>
                                    <td>
                                        <div className='d-flex column-gap-1'>
                                            <Link to={"/formateur/show-formation/" + formation.id}>
                                                <button className="btn btn-primary">Show</button>
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => deleteFormation(formation.id)}>Delete</button>
                                            <Link className="btn btn-success" to={"/formateur/edit-formation/" + formation.id}>Edit</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>}

                {formations && !searchByValue && <table className="table container mt-5 table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Domaine</th>
                            <th scope="col">Niveau</th>
                            <th scope="col">Descreption</th>
                            <th scope="col">Disponible</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formations.filter((formation) => user.formations_enseignees.includes(formation.id)).map((formation) => (
                                <tr key={formation.id}>
                                    <td>{formation.id}</td>
                                    <td>{formation.titre}</td>
                                    <td>{formation.domaine}</td>
                                    <td>{formation.niveau}</td>
                                    <td>{formation.description}</td>
                                    <td>{formation.disponible === "true" || formation.disponible === true ? <div><span className="badge bg-success">Disponible</span></div> : <div><span className="badge bg-danger">Indisponible</span></div>}</td>
                                    <td>
                                        <div className='d-flex column-gap-1'>
                                            <Link to={"/formateur/show-formation/" + formation.id}>
                                                <button className="btn btn-primary">Show</button>
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => deleteFormation(formation.id)}>Delete</button>
                                            <Link className="btn btn-success" to={"/formateur/edit-formation/" + formation.id}>Edit</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>}
            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={e => { e.preventDefault(); addFormation({ id: Math.floor(Math.random() * 1000), titre: e.target.titre.value, domaine: e.target.domaine.value, description: e.target.description.value, niveau: e.target.niveau.value, disponible: e.target.disponible.value }); }}>
                                <div className="mb-3">
                                    <label htmlFor="titre" className="form-label">titre</label>
                                    <input type="text" required name="titre" className="form-control" id="titre" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <textarea name="description" required id="description" cols="30" rows="10"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="niveau" className="form-label">niveau</label>
                                    <select name="niveau" id="niveau" className="form-select">
                                        <option value="Débutant">Débutant</option>
                                        <option value="Intermediaire">Intermediaire</option>
                                        <option value="Avance">Avance</option>
                                        <option value="Expert">Expert</option>
                                        <option value="Master">Master</option>
                                        <option value="PhD">PhD</option>
                                        <option value="Doctorat">Doctorat</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="domaine" className="form-label">domaine</label>
                                    <select name="domaine" id="domaine" className="form-select">
                                        <option value="Management">Management</option>
                                        <option value="Informatique">Informatique</option>
                                        <option value="Design">Design</option>
                                        <option value="Commerce">Commerce</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="disponible" className="form-label">Disponible</label>
                                    <select name="disponible" id="disponible" className="form-select">
                                        <option value={"true"}>True</option>
                                        <option value={"false"}>False</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableFormation
