import React, { useState } from "react";
import Button from "@material-ui/core/Button"
import Error from "./Error";
import axios from "axios";
import styles from "./UploadButton.css";

const UploadButton = ({
  onUpload,
  fileId,
  caption="Upload",
  color="secondary",
  visibleWhen = true,
  multiple = false,
  url="/filipizen/upload",
}) => {
  if (!visibleWhen) return null;

  const [error, setError] = useState();
  const [file, setFile] = useState("");
  const [progress, setProgess] = useState(0);

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
    formData.append("fileId", fileId);
    axios
      .post(url, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
          setProgess(progress);
        }
      })
      .then((res) => {
        const attachment = {
          name: res.data.name,
          key: res.data.key,
          location: res.data.location,
          path: res.data.path,
        }
        onUpload(attachment);
      })
      .catch((err) => setError(err));
  };

  return (
    <div className={styles.UploadButton}>
      <div className={styles.UploadButton__menu}>
        <input
          className={styles.UploadButton__input}
          id={fileId}
          type="file"
          onChange={handleFileChange}
          multiple={multiple}
        />
        <label htmlFor={fileId}>
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
    </div>
  );
};

export default UploadButton;
