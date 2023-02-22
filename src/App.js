import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  return (
   <BrowserRouter>
   <Navigation/>
   <Routes>
    <Route index element={<Home/>}/>
      <Route path="*" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;