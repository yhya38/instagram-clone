import React from "react";
import { Header, Post, ImageUpload } from "../../components";
// import { db } from "../../firebase";
import { makeStyles } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import "./dashboard.css";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Dashboard() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { posts } = useAuth();
  // console.log(currentUser);

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

      {/* <ImageUpload /> */}

      <Modal open={open} onClose={handleClose}>
        <div
          style={modalStyle}
          className={`${classes.paper} imageUploader_wrapper`}
        >
          <ImageUpload close={handleClose} />
        </div>
      </Modal>
      <button className="uploadSomething" onClick={handleOpen}>
        Click here to upload something
      </button>
    </div>
  );
}

export default Dashboard;
