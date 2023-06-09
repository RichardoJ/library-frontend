import { json, useLoaderData } from "react-router-dom";
import PaperList from "../components/PaperList";

function Paper() {
  const papers = useLoaderData();

  return <PaperList papers={papers} itemsPerPage={4} />;
}

export default Paper;

export async function loaderFunction() {
  const token = localStorage.getItem('token');
  const response = await fetch("http://online-library/api/paper/all",{
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //     status: 500,
    //   });
    throw json({ message: 'Could not fetch events.' }, {status: 500});
  } else {
    return response;
  }
};
