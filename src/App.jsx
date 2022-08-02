import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import Inicio from './Pages/inicio'
import NuevoCliente from './Pages/NuevoCliente'
import EditarCliente from './Pages/EditarCliente'



function App() {

  return (
    <BrowserRouter>
        <Routes>
             
            <Route path='/clientes' element={<Layout/>}>
              <Route index element={<Inicio/>}/>
              <Route path='nuevo' element={<NuevoCliente/>}/>
              <Route path='editar/:id' element={<EditarCliente/>}/>
            </Route>

        </Routes>
    </BrowserRouter>
  )
}

export default App
