import { json, redirect, useLoaderData } from "react-router-dom";
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
    const token = localStorage.getItem('token');
    if(token == null){
      return redirect("/");
    }
  
    const response = await fetch('http://online-library/api/paper/' + id, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  
    if (!response.ok) {
      throw json({message: 'Could not fetch details for selected paper.'}, {
        status: 500
      })
    } else {
      return response;
    }
  }