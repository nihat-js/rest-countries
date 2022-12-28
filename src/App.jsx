import React from 'react'
import { Routes, Route } from 'react-router-dom'

import IndexPage from './pages/Index'
import CountryPage from './pages/Country'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
      <Route path='/country/:name' element={<CountryPage />} />
    </Routes>
  )
}
