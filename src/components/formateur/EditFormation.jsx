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
        <div></div>
    )
}

export default EditFormation
