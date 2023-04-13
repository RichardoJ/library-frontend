import { json, useLoaderData } from "react-router-dom";
import PaperForm from "../components/PaperForm";

function EditPaper() {
    const data = useLoaderData();
    console.log(data);
    return <PaperForm paper={data}/>
}

export default EditPaper;

export async function loader({request, params}){
    const id = params.id;
    const url = "http://localhost:8010/gateway/api/paper/" + id;
    const response = await fetch(url);
  
    if (!response.ok) {
      // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      //     status: 500,
      //   });
      throw json({ message: 'Could not fetch events.' }, {status: 500});
    } else {
      return response;
    }
  }

// export async function action({request,params}){
//     const data = await request.formData();

//     // fetch('localhost:5201/api/publish', {
//     //     method: 'POST',
//     //     body:
//     // });
// }