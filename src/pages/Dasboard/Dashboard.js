import React from "react";
import { Header, Post, ImageUpload } from "../../components";
// import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./dashboard.css";

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
          <Post key={id} postId={id} {...post} />
        ))}
      </div>

      <ImageUpload />
    </div>
  );
}

export default Dashboard;
