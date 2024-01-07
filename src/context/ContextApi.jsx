import React, { createContext, useContext, useEffect, useState } from 'react'
import { axiosClient } from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

const Context = createContext({

    fetchFormations: () => { },
    fetchUtilisateurs: () => { },
    formations: [],
    utilisateurs: [],
    formation: {},
    fetchFormation: () => { },
    fetchUtilisateur: () => { },
    utilisateur: {},
    fetchFormateurs: () => { },
    formateurs: [],
    user: null,
    login: () => { },
    logout: () => { },
    errors: null,
    guard: null,
    deleteFormation: () => { },
    addFormation: () => { },
    updateFormation: () => { },
    searchByDomaine: () => { },
    searchByNiveau: () => { },
    inscriFormation: () => { },
    register: () => { },

});

const ContextApi = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [formations, setFormations] = useState(null);
    const [formation, setFormation] = useState(null);
    const [utilisateurs, setUtilisateurs] = useState(null);
    const [utilisateur, setUtilisateur] = useState(null);
    const [formateurs, setFormateurs] = useState(null);
    const [guard, setGuard] = useState(null)
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate()


    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('user'))) {
            setGuard(null);
            setUser(null);
        } else {
            setUser(JSON.parse(localStorage.getItem('user')));
            setGuard(JSON.parse(localStorage.getItem('user')).role);
        }
    }, [])

    const fetchFormations = async () => {
        try {
            const les_formations = await axiosClient.get('/formations');
            setFormations(les_formations.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFormation = async (id) => {
        try {
            const une_formation = await axiosClient.get('/formations/' + id);
            setFormation(une_formation.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUtilisateurs = async () => {
        try {
            const les_utilisateurs = await axiosClient.get('/utilisateurs');
            setUtilisateurs(les_utilisateurs.data);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchFormateurs = async () => {
        try {
            const les_formateurs = await axiosClient.get('/formateurs');
            setFormateurs(les_formateurs.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUtilisateur = async (id) => {
        try {
            const utilisateur = await axiosClient.get('/utilisateurs/' + id);
            setUtilisateur(utilisateur.data);
        } catch (error) {
            console.log(error);
        }
    }

    const searchByDomaine = (domaine) => {
        return formations.filter(formation => formation.domaine === domaine);
    }

    const searchByNiveau = (niveau) => {
        return formations.filter(formation => formation.niveau === niveau);
    }


    // Systeme Authentification
    async function login(guard, email, password) {

        setLoading(true);

        const les_utilisateurs = await axiosClient.get('/utilisateurs');
        try {
            les_utilisateurs.data.forEach(utilisateur => {
                if (utilisateur.role.toUpperCase() === guard.toUpperCase() && email.toLowerCase() === utilisateur.email.toLowerCase() && password === utilisateur.password) {
                    setUser(utilisateur);
                    setGuard(guard);
                    setErrors(null);
                    localStorage.setItem('user', JSON.stringify(utilisateur));
                    navigate('/' + guard);
                }
            });
            if (!user) {
                setErrors({ message: "Email ou mot de passe incorrect !" });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function register(guard, dataPar) {
        // console.log(dataPar);
        try {
            if (guard === 'formateur') {
                const { data } = await axiosClient.post('/utilisateurs', dataPar);
                login('formateur', data.email, data.password);
            } else if (guard === 'participant') {
                const { data } = await axiosClient.post('/utilisateurs', dataPar);
                login('participant', data.email, data.password);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const addFormation = (formation) => {
        setFormations([...formations, formation]);
        setUser({ ...user, formations_enseignees: [...user.formations_enseignees, formation.id] });
        localStorage.setItem('user', JSON.stringify(user));
    }

    const updateFormation = (id, formationParam) => {
        setFormations(prevFormations =>
            prevFormations.map(formation =>
                formation.id === id ? { ...formation, ...formationParam } : formation
            )
        );
    }




    const inscriFormation = (id) => {
        if (!user.formations_inscrites.includes(id)) {
            setUser({ ...user, formations_inscrites: [...user.formations_inscrites, id] });
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    const deleteFormation = (id) => {
        const confirm = window.confirm("Voulez-vous vraiment supprimer cette formation ?");
        if (confirm) {
            setFormations(formations.filter(formation => formation.id !== id));
            navigate('/formateur/table-formation');
        }
    }

    const logout = () => {
        setUser(null);
        setGuard(null);
        setErrors(null);
        localStorage.clear();
        navigate('/');

    }

    return (
        <Context.Provider value={{
            fetchFormations: fetchFormations,
            formations: formations,
            fetchUtilisateurs: fetchUtilisateurs,
            utilisateurs: utilisateurs,
            fetchFormation: fetchFormation,
            formation: formation,
            fetchUtilisateur: fetchUtilisateur,
            utilisateur: utilisateur,
            fetchFormateurs: fetchFormateurs,
            formateurs: formateurs,
            user: user,
            login: login,
            errors: errors,
            logout: logout,
            guard: guard,
            deleteFormation: deleteFormation,
            addFormation: addFormation,
            updateFormation: updateFormation,
            searchByDomaine: searchByDomaine,
            searchByNiveau: searchByNiveau,
            inscriFormation: inscriFormation,
            register: register,
        }}>
            {!loading ? children : <>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" style={{ width: '20rem', height: '20rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>}
        </Context.Provider>
    )
}

export const useContextApi = () => useContext(Context);

export default ContextApi
