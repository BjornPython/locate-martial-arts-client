import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


import UserHome from './public/routes/UserHome';

import AppHome from './public/routes/AppHome';
import Ghome from './public/comps/gymLoggedin/Ghome';


function App() {

  const { user, userType } = useSelector((state) => state.auth)

  return (
    <Router>
      <Routes>

        <Route path='/' element={<AppHome />} />

        {userType === "user" 
        ? 
        <Route path='/home' element={<UserHome />} /> 
        : 
        <Route path='/home' element={<Ghome user={user} userType={userType} />} />}
        {/* <Route path='/home' element={<UserHome />} />
        <Route path='/gymhome' element={<Ghome />} /> */}
      </Routes>

    </Router>

  )


}

export default App;
