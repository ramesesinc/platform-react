import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button"
import Error from "./Error";
import axios from "axios";
import styles from "./UploadButton.css";

const UploadButton = ({
  onUploadFile,
  caption,
  color="secondary",
  visibleWhen = true,
  multiple = false,
  uploadedFile={},
  url="/filipizen/upload",
  data
}) => {
  if (!visibleWhen) return null;

  const [error, setError] = useState();
  const [file, setFile] = useState("");
  const [progress, setProgess] = useState(0);
  const inputEl = useRef();

  const handleFileChange = (e) => {
    setProgess(0);
    const file = e.target.files[0];
    setFile(file);
    if (file) uploadFile(file);
  };

  const uploadFile = (file) => {
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(url, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
          setProgess(progress);
        }
      })
      .then((res) => {
        const file = {
          name: res.data.name,
          path: res.data.path
        }
        onUploadFile(file, data)
      })
      .catch((err) => setError(err));
  };

  return (
    <div className={styles.UploadButton}>
      <div className={styles.UploadButton__menu}>
        <input
          className={styles.UploadButton__input}
          ref={inputEl}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
          multiple={multiple}
        />
        <label htmlFor="contained-button-file">
          <Button variant="outlined" component="span" color={color}>
            {caption || "Upload"}
          </Button>
        </label>
        {progress != 0 && progress != 100 &&
          <div
            className={styles.UploadButton__progress}
            style={{ width: progress }}
          >
            {progress}%
          </div>
        }
        <Error msg={error} />
      </div>
        <img
          className={styles.UploadButton__img}
          src={uploadedFile.path}
          alt={uploadedFile.name}
        />
    </div>
  );
};

export default UploadButton;
