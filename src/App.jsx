import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TableFormation from './components/formateur/TableFormation';
import TableUtilisateur from './components/TableUtilisateur';
import ShowFormation from './components/formateur/ShowFormation';
import IndexParticipant from './layouts/participant/IndexParticipant';
import IndexFormatuer from './layouts/formateur/IndexFormatuer';
import IndexGuest from './layouts/guest/IndexGuest';
import FormatuerLogin from './components/guest/FormatuerLogin';
import ParticipantLogin from './components/guest/ParticipantLogin';
import TableFormationGuest from './components/guest/TableFormationGuest';
import { useContextApi } from './context/ContextApi';
import TableUtilisateurGuest from './components/guest/TableUtilisateurGuest';
import EditFormation from './components/formateur/EditFormation';
import AddFormation from './components/formateur/AddFormation';


function App() {

  const { user } = useContextApi()

  return (
    <div className='contaner'>
      <Routes>
        <Route path='*' element={<h1 className='text-center mt-5'>404</h1>} />

        <Route path={'/formateur'} element={<IndexFormatuer />}>
          <Route index element={<h1 className='text-center mt-5'>Welcome {user?.nom}</h1>} />
          <Route path='table-formation' element={<TableFormation />} />
          <Route path='show-formation/:id' element={<ShowFormation />} />
          <Route path='edit-formation/:id' element={<EditFormation />} />
          <Route path='add-formation' element={<AddFormation />} />

        </Route>

        <Route path={'/participant'} element={<IndexParticipant />}>
          <Route index element={<h1 className='text-center mt-5'>Welcome {user?.nom}</h1>} />
          <Route path='table-formation' element={<TableFormationGuest />} />
        </Route>

        <Route path={'/'} element={<IndexGuest />}>
          <Route index element={<h1 className='text-center mt-5'>Welcome guest</h1>} />
          <Route path='formateur/login' element={<FormatuerLogin />} />
          <Route path='participant/login' element={<ParticipantLogin />} />
          <Route path='table-formation' element={<TableFormationGuest />} />
          <Route path='table-ustilisateur' element={<TableUtilisateurGuest />} />
          <Route path='formation/:id' element={<ShowFormation />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
