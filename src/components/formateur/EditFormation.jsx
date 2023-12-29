import React, { useEffect } from 'react'
import { useContextApi } from '../../context/ContextApi'
import { useParams } from 'react-router-dom'

const EditFormation = () => {

    const { fetchFormation, formation, updateFormation } = useContextApi()
    const { id } = useParams()

    useEffect(() => {
        fetchFormation(id);
    }, [])

    return (
        <form className='container mt-5' onSubmit={e => {e.preventDefault(); updateFormation(id, {titre: e.target.titre.value, domaine: e.target.domaine.value, descreption: e.target.description.value})}}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">titre</label>
                <input type="text" name="titre" defaultValue={formation?.titre} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="domaine" className="form-label">domaine</label>
                <input type="text" name="domaine" defaultValue={formation?.domaine} className="form-control" id="domaine" />
            </div>
            <div className="mb-3">
                <label htmlFor="domaine" className="form-label">description</label>
                <input type="text" name="description" defaultValue={formation?.description} className="form-control" id="domaine" />
            </div>
            <div className="mb-3">
                <label htmlFor="disponible" className="form-label">Disponible</label>
                <select defaultValue={formation?.disponible} name="disponible" id="disponible" className="form-select" aria-label="Default select example">
                    <option value="1" selected={formation?.disponible}>True</option>
                    <option value="0" selected={!formation?.disponible}>False</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default EditFormation
