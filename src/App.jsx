import { useState } from 'react'
import './App.css'
import About from './components/about'
import Homepage from './components/homepage'
import Interests from './components/interests'
import Projects from './components/projects'

function App() {
  return (
    <>
    <Homepage />
    <About />
    <Interests />
    <Projects />
    </>
  )
}

export default App
