import React, { useEffect, useState } from "react";
import { dbService, authService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const OnLogOutClick = () => {
    authService.signOut();
    //login 전의 페이지 url로 이동하는 것
    history.push("/");
  }

  const getMyNweets = async () => {
   const nweets = await dbService
   .collection("nweets")
   .where("creatorId", "==", userObj.uid)
   .orderBy("createdAt")
   .get();
  }
  useEffect( () => {
    getMyNweets();
  }, [])

  const onChange = (event) =>{
    const {
      target: {value},
    } = event;
      setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
      event.preventDefault();
      if(userObj.displayName !== newDisplayName){
        await userObj.updateProfile({
          displayName: newDisplayName,
        });
        refreshUser();
      };
    };

  return (
    <div className="container">
      <form onSubmit= {onSubmit} className="profileForm">
        <input 
        onChange = {onChange}
        type="text" 
        autoFocus
        placeholder="Display name"
        value={newDisplayName}
        className="formInput"
        />
        <input 
        type="submit" 
        value="Update Profile"
        className="formBtn"
        style={{ marginTop: 10, }} 
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick = {OnLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
