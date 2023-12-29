import React, { useEffect, useState } from 'react'
import { useContextApi } from '../../context/ContextApi';
import { useParams, Link } from 'react-router-dom';

const ShowFormation = () => {

    const { fetchFormation, formation } = useContextApi();
    const [Loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        fetchFormation(id).then(() => setLoading(false));
    }, [])

    return (
        <div className="container mt-5 w-50">

            {!Loading ? formation &&
                <div className="card">
                    <div className="card-header">
                        {formation.titre}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title"><b>Domaine:</b> {formation.domaine} <br /><b>Niveau:</b> {formation.niveau}</h5>
                        <p className="card-text">{formation.description}</p>
                        <Link className="btn btn-success" to={"/formateur/edit-formation/" + formation.id}>Edit</Link>
                    </div>
                </div>
            : <h1 className='text-center mt-5'>Loading...</h1>}
        </div>
    )
}

export default ShowFormation
