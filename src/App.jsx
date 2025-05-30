import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import LandingPage from './pages/LandingPage'
import ConnectFourPage from './pages/ConnectFourPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect-four" element={<ConnectFourPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
