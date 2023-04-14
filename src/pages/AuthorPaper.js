import { json, useLoaderData } from "react-router-dom";
import AuthorPaperList from "../components/AuthorPaperList";

function AuthorPaper() {
  const papers = useLoaderData();

  return <AuthorPaperList values={papers} />;
}

export default AuthorPaper;

export async function loaderFunction() {
  const id = localStorage.getItem('Id');
  const response = await fetch(`http://localhost:8010/gateway/api/paper/author/${id}`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch events.' }, {status: 500});
  } else {
    return response;
  }
};

