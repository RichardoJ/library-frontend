import { Form, useNavigate, useParams } from 'react-router-dom';
import useInput from '../hooks/use-input';

import classes from './PaperForm.module.css';
import DOMPurify from 'dompurify';

function PaperForm({ method, paper }) {
  const navigate = useNavigate();
  const params = useParams();

  //Name
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  //Details
  const {
    value: enteredDetails,
    isValid: enteredDetailsIsValid,
    hasError: detailsInputHasError,
    valueChangeHandler: detailsChangeHandler,
    inputBlurHandler: detailsBlurHandler,
    reset: resetDetailsInput,
  } = useInput((value) => value.trim() !== "");

  function cancelHandler() {
    navigate('..');
  }

  function submitHandler(event){
    event.preventDefault();
    console.log(enteredName);
    console.log(enteredDetails);

    const sanitizedTitle = DOMPurify.sanitize(enteredName);
    const sanitizedDesc = DOMPurify.sanitize(enteredDetails);

    const updatePaper = {
      id: params.id,
      title: sanitizedTitle,
      description: sanitizedDesc,
      author: paper.author,
      publishedYear: paper.publishedYear,
      category: paper.category,
      authorId:paper.authorId,
      citeCount: paper.citeCount,
      paperLink: paper.paperLink
    };

    fetch("http://localhost:8010/gateway/api/publish/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(updatePaper),
    }).then((res) => {
      if (res.ok) {
        alert('Paper Updated Successfully');
      }
    })
    .catch((err) => {
      alert('Failed to Update');
    });

  }

  return (
    <>
    <h1>{params.id}</h1>
      <Form className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          onChange={detailsChangeHandler}
          onBlur={detailsBlurHandler}
          value={enteredDetails}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button onClick={submitHandler}>Save</button>
      </div>
    </Form>
    </>
  );
}

export default PaperForm;


