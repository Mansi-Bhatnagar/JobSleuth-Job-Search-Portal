import { useState } from "react";
import { useRef } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import classes from "./ApplyModal.module.css";
const ApplyModal = (props) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [submit, setSubmit] = useState(false);
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachedFile(e.dataTransfer.files[0]);
    }
  };
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };
  const onButtonClick = () => {
    inputRef.current.click();
  };
  const renderFileName = () => {
    return <p className={classes.fileName}>{attachedFile?.name}</p>;
  };
  const handleCoverLetter = (e) => {
    setCoverLetter(e.target.value);
  };
  const applicationSubmitHandler = (e) => {
    e.preventDefault();
    if (!attachedFile || !coverLetter) return;
    else {
      setSubmit(true);
    }
  };

  const handleClose = () => {
    setSubmit(false);
    setAttachedFile(null);
    setCoverLetter("");
    props.onClose();
  };
  const applicationContent = (
    <div className={classes.container}>
      <h1>Job Application</h1>
      <h3>
        Thanks for your interest in this position. Please fill in the
        information below.
      </h3>
      <form
        className={classes.form}
        onDragEnter={handleDrag}
        onSubmit={applicationSubmitHandler}
      >
        <h6>
          Upload your resume<span style={{ color: "#d00000" }}> *</span>
        </h6>
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          onChange={handleChange}
          className={classes.fileInput}
          required={true}
        />
        <label
          className={`${classes.fileLabel} ${
            dragActive ? classes.dragActive : ""
          }`}
          htmlFor="input-file-upload"
        >
          <div>
            <CloudUploadIcon
              sx={{
                filter:
                  "invert(64%) sepia(12%) saturate(317%) hue-rotate(185deg) brightness(97%) contrast(84%)",
                fontSize: "2rem",
                marginTop: "20px",
              }}
            />
            <p>Drag and drop your file here or</p>
            <Button
              variant="contained"
              className={classes.uploadButton}
              onClick={onButtonClick}
            >
              Upload a file
            </Button>
            {attachedFile && renderFileName()}
          </div>
        </label>
        {dragActive && (
          <div
            className={classes.dragFileElement}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <h6>
          Write a Cover Letter<span style={{ color: "#d00000" }}> *</span>
        </h6>
        <textarea
          rows={8}
          className={classes.coverLetter}
          onChange={handleCoverLetter}
          value={coverLetter}
          required={true}
        />
        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={applicationSubmitHandler}
        >
          Submit
        </Button>
        <br />
        <br />
      </form>
    </div>
  );
  const submittedContent = (
    <div className={classes.successContainer}>
      <CheckCircleOutlineTwoToneIcon
        sx={{
          fontSize: "60px",
          color: "#ff4d6d",
        }}
      />
      <h2>Thanks, your application is submitted successfully!</h2>
    </div>
  );
  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {submit ? submittedContent : applicationContent}
    </Modal>
  );
};

export default ApplyModal;
