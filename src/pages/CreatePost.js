import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUploadURL, setImageUploadURL] = useState("");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUploadURL(url);
      });
    });
  };

  const getUNIX = () => {
    const date = new Date();
    return date.getTime();
  };

  const getTimeStamp = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    return date + " " + time;
  };

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        email: auth.currentUser.email,
      },
      image: imageUploadURL,
      unix: getUNIX(),
      time: getTimeStamp(),
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Image:</label>
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <button onClick={uploadImage}>Upload Image</button>
        </div>
        <div className="inputGp">
          <label>Text:</label>
          <textarea
            placeholder="Text..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button
          className={
            title.length === 0 ||
            title.length > 40 ||
            postText.length === 0 ||
            postText.length > 500 ||
            !imageUploadURL
              ? "submitButton-disabled"
              : "submitButton"
          }
          onClick={createPost}
          disabled={
            title.length === 0 ||
            title.length > 40 ||
            postText.length === 0 ||
            postText.length > 500 ||
            !imageUploadURL
          }
        >
          Submit Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
