import { Form, useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from "./PublishForm.module.css";
import { useRef } from "react";
import { useState } from "react";
import DOMPurify from "dompurify";

function PublishForm() {
  const navigate = useNavigate();

  const token = useRouteLoaderData('root');

  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionRef = useRef(null);
  const [file, setFile] = useState();
  const [fileExtensionError, setFileExtensionError] = useState(false);
  const [valid, setValid] = useState(false);

  let formIsValid = false;

  if (valid) {
    formIsValid = true;
  }

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const fileChangeHandler = (e) => {
    e.preventDefault();
    var extension = getExtension(e.target.files[0].name);
    if (extension === "pdf") {
      setFile(e.target.files[0]);
      setValid(true);
      setFileExtensionError(false);
    } else {
      setFileExtensionError(true);
    }
  };

  const resetInput = () => {
    titleRef.current.value = "";
    categoryRef.current.value = "";
    descriptionRef.current.value = "";
    setFile('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const sanitizedTitle = DOMPurify.sanitize(titleRef.current.value);
    const sanitizedDesc = DOMPurify.sanitize(descriptionRef.current.value);
    const sanitizedCategory = DOMPurify.sanitize(categoryRef.current.value);
    const authorId = localStorage.getItem('Id');
    formData.append("title", sanitizedTitle);
    formData.append("description", sanitizedDesc);
    formData.append("author", "Richardo");
    formData.append("category", sanitizedCategory);
    formData.append("publishedYear", new Date().getFullYear());
    formData.append("authorId", authorId);
    formData.append("citecount", 0);
    formData.append("Pdf", file);

    fetch("http://localhost:8010/gateway/api/publish/pdf", {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("File uploaded successfully.");
          resetInput();
        }
        if (!res.ok) {
          resetInput();
          return res.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  function cancelHandler() {
    navigate("..");
  }

  return (
    <>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" required ref={titleRef} />
        </p>
        <p>
          <label htmlFor="number">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            required
            ref={categoryRef}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            ref={descriptionRef}
          />
        </p>
        <p>
          <label htmlFor="file">Choose File</label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            max-size="15728640"
            rows="5"
            required
            onChange={fileChangeHandler}
          />
        </p>
        {fileExtensionError === true && (
          <p style={{ color: "red" }}>Upload only PDF file</p>
        )}
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit" disabled={!formIsValid}>
            Save
          </button>
        </div>
      </Form>
    </>
  );
}

export default PublishForm;
