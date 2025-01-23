import { HashRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import Labs
 from './Labs'
import Kambas from './Kambas'
function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
         <Route path="/" element={<Navigate to="/Kambas" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambas/*" element={<Kambas />} />
        </Routes>
      </div>
    </HashRouter>
    
  )
}

export default App
