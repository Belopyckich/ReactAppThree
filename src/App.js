import {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/UI/Navbar/Navbar';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context/index';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setLoading(false);
  }, [])
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
        <BrowserRouter>
          <Navbar/>
          <AppRouter/>
        </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
