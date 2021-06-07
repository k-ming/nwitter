import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const OnLogOutClick = () => {
    authService.signOut();
    //login 전의 페이지 url로 이동하는 것
    history.push("/");
  }
  return (
    <>
    <button onClick = {OnLogOutClick}>Log Out</button>
    </>
  );
};
