import React, { useState, useEffect } from "react";
import "./post.css";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import firebase from "firebase";

function Post({ imageUrl, username, caption, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const { currentUser } = useAuth();
  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt="post" className="post_image" />
      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <b>{comment.username} </b> {comment.text}
          </p>
        ))}
      </div>
      <form className="post_commentBox">
        <input
          type="text"
          className="post_input"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post_button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
