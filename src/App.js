import Topbar from './components/topbar/Topbar'
import Home from "./pages/home/Home";
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user}=useContext(Context);
  return (
   <BrowserRouter>
        <Topbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={user ? <Home /> :<Login />} />
          <Route exact path='/register' element={user ? <Home /> : <Register />} />
          <Route exact path='/settings' element={user ? <Settings /> :<Register />} />
          <Route exact path='/write' element={user ? <Write /> :<Register />} />
          <Route exact path='/post/:postId' element={<Single />} />
        </Routes>
   </BrowserRouter>
  );
}

export default App;
