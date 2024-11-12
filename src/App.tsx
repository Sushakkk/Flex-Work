
import './App.css'
import Header from './components/Header/Header'
import './styles/null.css'
import './styles/style.css'

import './styles/hover.css'


import HomePage from './pages/HomePage/HomePage'
import { Routes, Route} from 'react-router-dom';
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage'
import ActivityPage from './pages/ActivityPage/ActivityPage'
import { useEffect } from 'react'





function App() {
  useEffect(() => {
    if (window.TAURI) {
      const { invoke } = window.TAURI.tauri;

      invoke('tauri', { cmd: 'create' })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));

      return () => {
        invoke('tauri', { cmd: 'close' })
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error));
      };
    }
  }, []);

 
  return (
    <div className="wrapper">
      <Header />

        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/activities" element={<ActivitiesPage/>} />
          <Route path="/activity/:id" element={<ActivityPage />} />
        </Routes>

    </div>
  )
}


export default App
