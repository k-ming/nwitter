import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";


const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState(); 
  useEffect( () => {             //snapshot으로 업데이트, 에딧 다 할 수 있음
   dbService.collection("nweets").onSnapshot( (snapshot) => {
     const nweetArray = snapshot.docs.map(doc => ({ id:doc.id, ...doc.data(), }));
     setNweets(nweetArray);
    })
  }, [])
  const onSubmit = async (event) =>{
    event.preventDefault();
    let attachmentUrl = "";
    if(attachment !== ""){
      const attachmentRef = storageService
      .ref()
      .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
      const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      };
    
    //firebase firestore set collection
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const { target: {value}} = event;
    setNweet(value);
  };
  //image upload
  const onFileChange = (event) => {
    const {target: {files}, } = event;
    const theFile = files[0]; //get file
    const reader = new FileReader(); //create reader
    reader.onloadend = (finishedEvent) => {
     const {
       currentTarget: {result}, } = finishedEvent;
      setAttachment(result);
    }  // event listener for reader
    reader.readAsDataURL(theFile); // read file
  };
  const onClearAttachmentClick = () => {
    setAttachment(null)
  }
  return (
    <div>
    <form onSubmit={onSubmit}>
      <input 
      value={nweet} 
      onChange={onChange} 
      type="text" 
      placeholder="What's on your mind?" 
      maxLength={120} 
      />
      <input type="file" accept="image/*" onChange = {onFileChange} />
      <input type="submit" value="Tweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick = {onClearAttachmentClick}>Clear</button>
        </div>
        )}
    </form>
    <div>
      {nweets.map( (nweet) => (
         <Nweet 
         key={nweet.id} 
         nweetObj={nweet} 
         isOwner={nweet.creatorId === userObj.uid} 
         />
      ))}
    </div>
  </div>
  );
};
export default Home;