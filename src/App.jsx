import React from 'react';
import './App.css'
import { ThemeProvider } from './ThemeContext';
import FirstPage from './components/firstPage'
import Loading from './components/Loading'
import Navbar from './components/navbar'

function App() {


  return (
    <ThemeProvider>
     <Navbar />
     <FirstPage />
    </ThemeProvider>
  )
}

export default App
