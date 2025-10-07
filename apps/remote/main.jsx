import React from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header.jsx'
import Aside from './components/Aside.jsx'
import Main from './components/Main.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <>
    <Header />
    <Aside />
    <Main />
  </>
)

