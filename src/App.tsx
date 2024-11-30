// index.tsx или App.tsx

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header/Header'
import './styles/null.css'
import './styles/style.css'

import './styles/hover.css'


import HomePage from './pages/HomePage/HomePage'
import { Routes, Route} from 'react-router-dom';
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage'
import ActivityPage from './pages/ActivityPage/ActivityPage'
import { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage'
import { AccessDeniedPage } from './pages/AccessDeniedPage/AccessDeniedPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useAppDispatch, useAppSelector } from './store'
import { handleCheck } from './slices/userSlice'




function App() {
  const dispatch = useAppDispatch()

  const {checked} = useAppSelector((state) => state.user)

  useEffect(() => {
      dispatch(handleCheck())
  }, []);

  if (!checked) {
      return <></>
  }

 
  return (
    <div className="wrapper">
      <Header />
  
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/activities" element={<ActivitiesPage/>} />
          <Route path="/activity/:id" element={<ActivityPage />} />
          {/* <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} /> */}
                        <Route path="/login/" element={<LoginPage />} />
                        {/* <Route path="/register/" element={<RegisterPage />} /> */}
        </Routes>

    </div>
  )
}


export default App