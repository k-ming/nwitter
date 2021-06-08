import React from "react";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
<nav>
  <ul style={{ display: "flex", justifyContent: "center", alignItem: "center", marginTop: 50}}>
    <li style={{ width: 60 , textAlign: "center"}}>
      <Link to="/" style={{ margin: 10}}>
        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
      </Link>
    </li>
    <li style={{ width: 60, textAlign: "center"}}>
      <Link to="/profile"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItem: "center",
        fontSize: 12,
        
      }}
      >
        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" pull="right" />
        <span style={{ marginTop: 10}}>
          {userObj.displayName ? `${userObj.displayName}` : "Profile"}
        </span>
      </Link>
    </li>
  </ul>
</nav>
);

export default Navigation;