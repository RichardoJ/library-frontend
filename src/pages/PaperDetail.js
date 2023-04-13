import { json, useLoaderData } from "react-router-dom";
import PaperItem from "../components/PaperItem";

function PaperDetail(){
    const data = useLoaderData();

    return(
        <PaperItem data ={data} />
    );
}

export default PaperDetail

export async function loader({request, params}) {
    const id = params.id;
  
    const response = await fetch('http://localhost:8010/gateway/api/paper/' + id);
  
    if (!response.ok) {
      throw json({message: 'Could not fetch details for selected paper.'}, {
        status: 500
      })
    } else {
      return response;
    }
  }