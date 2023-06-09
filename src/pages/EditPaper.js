import { json, redirect, useLoaderData } from "react-router-dom";
import PaperForm from "../components/PaperForm";

function EditPaper() {
    const data = useLoaderData();
    console.log(data);
    return <PaperForm paper={data}/>
}

export default EditPaper;

export async function loader({request, params}){
    const id = params.id;
    const token = localStorage.getItem('token');
    if(token == null){
      return redirect("/");
    }
    const url = "http://online-library/api/paper/" + id;
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  
    if (!response.ok) {
      throw json({ message: 'Could not fetch events.' }, {status: 500});
    } else {
      return response;
    }
  }