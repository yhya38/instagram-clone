import React, { useState, useEffect } from "react";
import { Header, Post, ImageUpload } from "../../components";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

function Dashboard() {
  const { posts, currentUser } = useAuth();
  console.log(currentUser);

  if (!posts) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard_post_container">
        {posts.map(({ post, id }) => (
          <Post
            key={id}
            imageUrl={post.imageUrl}
            username={post.username}
            caption={post.caption}
          />
        ))}
      </div>

      <ImageUpload />
    </div>
  );
}

export default Dashboard;
