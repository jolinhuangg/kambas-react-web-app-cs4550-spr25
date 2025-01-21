import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Labs
 from './Labs'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Labs />
    </div>
  )
}

export default App
