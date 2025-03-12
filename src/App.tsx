<<<<<<< Updated upstream
import './App.css'
import Labs
 from './Labs'
function App() {
  return (
    <div>
      <Labs />
    </div>
  )
}

export default App
=======
import { HashRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import Labs from "./Labs";
import Kambas from "./Kambas";
import store from "./Kambas/store";
import { Provider } from "react-redux";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Kambas" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambas/*" element={<Kambas />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
>>>>>>> Stashed changes
