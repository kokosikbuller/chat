import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import './App.scss'


function App() {

  return (
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
