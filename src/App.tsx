
import './App.css'
import Header from './components/Header/Header'
import './styles/null.css'
import './styles/style.css'

import './styles/hover.css'


import HomePage from './pages/HomePage/HomePage'
import { Routes, Route} from 'react-router-dom';
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage'
import ActivityPage from './pages/ActivityPage/ActivityPage'




function App() {
 
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
