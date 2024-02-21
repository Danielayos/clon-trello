import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import LoginPages from './pages/login'



function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPages/>} />
    </Routes>
    </BrowserRouter>
    
  </>
  )
}

export default App;
