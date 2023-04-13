import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./PaperList.module.css";
import { useState } from "react";
import Pagination from "./Pagination";

function PaperList({ papers, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(papers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const papersToDisplay = papers.slice(startIndex, endIndex);

  function handlePageClick(page) {
    setCurrentPage(page);
  }


  return (
    <div className={classes.events}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
      <ul className={classes.list}>
        {papersToDisplay.map((paper) => (
          <li key={paper.id}>
            {/* <Link to={"/paper/detail/" + paper.id}>
              <div className={classes.content}>
                <h2>Title : {paper.title}</h2>
                <h5>{paper.author}</h5>
                <time>Date Published: {paper.publishedYear}</time>
                <h5>Description : {paper.description}</h5>
              </div>
            </Link> */}
            <Link
              to={"/paper/detail/" + paper.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div>
                <Card className={classes.content}>
                  <Card.Body className="text-left">
                    <Card.Title>{paper.title}</Card.Title>
                    <p>{paper.author}</p>
                    <time>Date Published: {paper.publishedYear}</time>
                    <p>Description : {paper.description}</p>
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

export default PaperList;
