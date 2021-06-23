import React from "react";
import "./post.css";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from '../../contexts/AuthContext'

function Post({ imageUrl, username, caption }) {
 
  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="Yahiya khan"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt="post" className="post_image" />
      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
}

export default Post;
