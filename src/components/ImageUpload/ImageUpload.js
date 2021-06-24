import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./imageUpload.css";
import { storage, db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase";

function ImageUpload({ close }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  //   const [url, setUrl] = useState("");

  const { currentUser } = useAuth();
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //   progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //   complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: currentUser.displayName,
            });
            setCaption(" ");
            setImage(null);
            setProgress(0);
            alert("Successfully uploaded..");
            close();
          });
      }
    );
  };
  return (
    <div className="imageUploader">
      <div className="imageUploader_wrapper">
        <progress
          className="imageUploader_progress"
          value={progress}
          max="100"
        />
        <TextField
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter a caption..."
          label="caption"
        />

        <TextField type="file" onChange={handleChange} />
        <Button
          disabled={!image}
          color="primary"
          variant="outlined"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
