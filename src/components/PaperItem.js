import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import classes from "./PaperItem.module.css";

function PaperItem({ data }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);

  async function getPdfFile() {
    const url = data.paperLink;
    const filename = url.substring(url.lastIndexOf("/") + 1);
    const fetchUrl =
      "http://localhost:8010/gateway/api/catalog/Storage/pdf/" + filename;
    const response = await fetch(fetchUrl);
    const value = await response.arrayBuffer();
    setPdfFile(new Uint8Array(value));
  }

  useEffect(() => {
    getPdfFile();
  }, []);

  async function renderPdf() {
    const pdf = await pdfjs.getDocument({ data: pdfFile }).promise;
    setNumPages(pdf.numPages);
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.getElementById("pdf-canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport: viewport }).promise;

    canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }

  useEffect(() => {
    if (pdfFile) {
      renderPdf();
    }
  }, [pdfFile, pageNumber]);

  const downloadHandler = async () => {
    const url = data.paperLink;
    const filename = url.substring(url.lastIndexOf("/") + 1);
    const fetchUrl =
      "http://localhost:8010/gateway/api/catalog/Storage/" + filename;
    const response = await fetch(fetchUrl);
    const blob = await response.blob();

    const objectUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <div>
        <Row>
          <Col className={classes.content}>
            <Row>
              <div className={classes.container}>
                <div className={classes.left}>
                  <h4 className={classes.heading}>Original Article</h4>
                </div>
                <div
                  style={{
                    borderRight: "1px solid #ccc",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    height: "100%",
                  }}
                ></div>
                <div className={classes.left}>
                  <h4 className={classes.heading}>
                    Published Year : {data.publishedYear}
                  </h4>
                </div>
              </div>
            </Row>
            <h2 className={classes.title}>{data.title}</h2>
            <p className={classes.category}>{data.category.name}</p>
            <Row>
              <div className={classes.container}>
                <div className={classes.left}>
                  <p className={classes.heading}>{data.author}</p>
                </div>
                <div
                  style={{
                    borderRight: "1px solid #ccc",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    height: "100%",
                  }}
                ></div>
                <div className={classes.left}>
                  <p className={classes.heading}>
                    Cite count : {data.citeCount}
                  </p>
                </div>
              </div>
            </Row>

            <Button variant="success" className={classes.button} onClick={downloadHandler}>
              Download
            </Button>

            <h2 className={classes.description}>Description</h2>
            <hr className={classes.divider}></hr>
            <p>{data.description}</p>
          </Col>
          <Col>
            {pdfFile && (
              <div>
                <canvas id="pdf-canvas" />
                <div>
                  <button
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={pageNumber === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={pageNumber === numPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PaperItem;
