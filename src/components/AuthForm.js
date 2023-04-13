import { useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

import classes from "./AuthForm.module.css";

function AuthForm() {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [submit, setSubmit] = useState(false);
  const nameRef = useRef(null);
  const uniRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }

  const resetInput = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmit(true);
    // const sanitizedName = DOMPurify.sanitize(nameRef.current.value);
    // const sanitizedUni = DOMPurify.sanitize(uniRef.current.value);
    const sanitizedEmail = DOMPurify.sanitize(emailRef.current.value);
    const sanitizedPassword = DOMPurify.sanitize(passwordRef.current.value);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBN9i8z_kLlpXzWgWHpj5IWOAociIyJr-k",
      {
        method: "POST",
        body: JSON.stringify({
          email: sanitizedEmail,
          password: sanitizedPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.idToken);
        fetch("http://localhost:5289/api/user/login", {
          method: "POST",
          body: JSON.stringify({
            email: sanitizedEmail,
            password: sanitizedPassword,
          }),
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        }).then((res) => {
          if (res.ok) {
            resetInput();
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication Failed!";
              throw new Error(errorMessage);
            });
          }
        }).then((data) => {
          navigate('/about');
          localStorage.setItem('Id', data.id);
          localStorage.setItem('status', true);
        })
      })
      .catch((err) => {
        setSubmit(false);
        alert(err);
      });
  };

  return (
    <>
      <Form className={classes.form} onSubmit={submitHandler}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {!isLogin && (
          <p>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" required ref={nameRef} />
          </p>
        )}
        {!isLogin && (
          <p>
            <label htmlFor="university">University</label>
            <input
              id="university"
              type="text"
              name="university"
              required
              ref={uniRef}
            />
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required ref={emailRef} />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            ref={passwordRef}
          />
        </p>
        <div className={classes.actions}>
          <button onClick={switchAuthHandler} type="button">
            {isLogin ? "Create new user" : "Login"}
          </button>
          <button type="submit" disabled={submit}>{submit ? 'Submitting...' : 'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
