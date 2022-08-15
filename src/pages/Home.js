import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [randstate, setRandstate] = useState(0);

  const deletePost = async (id) => {
    setRandstate(randstate + 1);
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  const getFirstName = (name) => {
    const splitName = name.split(" ");
    return splitName[0];
  };

  function compare(a, b) {
    if (a.unix < b.unix) {
      return 1;
    }
    if (a.unix > b.unix) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort(compare)
      );
    };

    getPosts();
  }, [randstate]);

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div key={post.id} className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
                <p className="postTime">{post.time}</p>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#735;
                  </button>
                )}
              </div>
            </div>
            <div>
              <img src={post.image} />
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <div className="postFooter">
              <div className="authorName">
                <h3>@{post.author.name}</h3>
              </div>
              <div className="emailButton">
                <a href={"mailto:" + post.author.email}>
                  Email {getFirstName(post.author.name)}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
