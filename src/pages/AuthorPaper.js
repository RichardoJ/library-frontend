import { useLoaderData } from "react-router-dom";
import AuthorPaperList from "../components/AuthorPaperList";

function AuthorPaper() {
  const papers = useLoaderData();
  console.log(papers);

  return <AuthorPaperList values={papers} />;
}

export default AuthorPaper;

