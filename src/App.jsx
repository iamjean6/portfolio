import { useState } from 'react'
import './App.css'
import About from './components/about'
import Homepage from './components/homepage'
import Interests from './components/interests'
import Projects from './components/projects'
import Education from './components/education'
import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <>
    <Homepage />
    <About />
    <Interests />
    <Education />
    <Projects />
    
    <ChatWidget />
    </>
  )
}

export default App
