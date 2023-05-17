import { Route, Routes } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import MainLayout from './layouts/MainLayout'
import Payment from './pages/Payment'
import HomeScreen from './screen/HomeScreen'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Header />
      <MainLayout>
        <main>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </MainLayout>
    </>
  )
}

export default App
