import React, { useState, useEffect } from 'react';
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //user iD로 로그인기능
  const [userObj, setUserObj] = useState(null);
  useEffect( () => {
    authService.onAuthStateChanged( (user) => {
    if(user){
      setUserObj(user);
    }else{
      setIsLoggedIn(false);
    }
    setInit(true);
  });
  }, []);
  return (
    //login 했는지 알 수 있게 해주는 것
    <>
    {init ? <AppRouter isLoggedIn = {Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </> 
    );
}

export default App;
