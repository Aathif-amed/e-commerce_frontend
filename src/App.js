import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Navigation from './components/Navigation';

function App() {
  return (
   <BrowserRouter>
   <Navigation/>
   <Routes>
    <Route index element={<Home/>}/>
      <Route path="*" element={<Home/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;