import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <AuthProvider>
    <Routes>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </AuthProvider>
   </>
  )
}

export default App
