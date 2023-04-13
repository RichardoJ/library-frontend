import { json, useLoaderData } from "react-router-dom";
import PaperList from "../components/PaperList";

function Paper() {
  const papers = useLoaderData();

  return <PaperList papers={papers} itemsPerPage={4} />;
}

export default Paper;

export async function loaderFunction() {
  const response = await fetch("http://localhost:8010/gateway/api/paper/all");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //     status: 500,
    //   });
    throw json({ message: 'Could not fetch events.' }, {status: 500});
  } else {
    return response;
  }
};
