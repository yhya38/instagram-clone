import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import './imageUpload.css'

function ImageUpload() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  //   const [url, setUrl] = useState("");
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
    const handleUpload = () => {
      
  };
  return (
      <div className='imageUploader'>
          <div className='imageUploader_wrapper'>

      <TextField
        type="text"
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter a caption..."
        label="caption"
      />

      <TextField type="file" onChange={handleChange} />
      <Button color="primary" variant="outlined" onClick={handleUpload}>
        Upload
      </Button>
          </div>
    </div>
  );
}

export default ImageUpload;
