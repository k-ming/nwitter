import React, { useState, useEffect } from 'react';
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); 
  //user iD로 로그인기능
  const [userObj, setUserObj] = useState(null);
  useEffect( () => {
    authService.onAuthStateChanged( (user) => {
    if(user){
      //firebase language 랑 react language를 연결시켜주는 것
      //프로필이름 업뎃시 실시간으로 업뎃
      setUserObj({
        displayName: user.displayName,
        uid:user.uid,
        updateProfile: (args) => user.updateProfile(args),
      });
    }else{
      setUserObj(null);
    }
    setInit(true);
  });
  }, []);

  const refreshUser = () => {
   const user = authService.currentUser;
    setUserObj({        
      displayName: user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  return (
    //login 했는지 알 수 있게 해주는 것
    <>
    {init ? <AppRouter isLoggedIn = {Boolean(userObj)} refreshUser={refreshUser} userObj={userObj} /> : "Initializing..."}
    <footer style={{
        marginTop: 50,
        textAlign: "center"
    }}>&copy; {new Date().getFullYear()} Nwitter </footer>
    </> 
    );
}

export default App;
