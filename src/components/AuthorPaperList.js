import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./AuthorPaperList.module.css";

function AuthorPaperList({ values }) {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    setPapers(values);
  }, [values]);

  const deleteHandler = (e, id) => {
    e.preventDefault();
    const proceed = window.confirm("Are You Sure to delete this paper?");

    if (proceed) {
      // TO-DO insert API
      fetch("http://localhost:8010/gateway/api/publish/delete/" + id, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      })
        .then((res) => {
          if (res.ok) {
            alert("Paper Deleted successfully.");
            setPapers((oldValues) => {
              return oldValues.filter((paper) => paper.id !== id);
            });
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className={classes.events}>
      <h1>All Paper</h1>
      <ul className={classes.list}>
        {papers.map((paper) => (
          <li key={paper.id}>
            <Link
              to={"/paper/detail/" + paper.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div>
                <Card className={classes.content}>
                  <Card.Body className="text-left">
                    <Row>
                      <Col>
                        <Card.Title>{paper.title}</Card.Title>
                        <p>{paper.author}</p>
                        <time>Date Published: {paper.publishedYear}</time>
                        <p>Description : {paper.description}</p>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-end">
                      <Link
                            to={"/author/paper/edit/" + paper.id}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Button variant="outline-warning">Edit</Button>
                          </Link>
                          <Button
                            variant="outline-danger"
                            onClick={(e) => deleteHandler(e, paper.id)}
                          >
                            Delete
                          </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorPaperList;
