import PublishForm from "../components/PublishForm"

function NewPaper(){
    return <PublishForm/>;
}

export default NewPaper

// export async function action({request, params}){
//     const data = await request.formData();

//     // const publishedData = {
//     //     title: data.get('title'),
//     //     description: data.get('description'),
//     //     author: "Richardo",
//     //     category: data.get('category'),
//     //     publishedYear: new Date().getFullYear(),
//     //     authorId: 1,
//     //     citecount:0,
//     // }

    // const formData = new FormData();
    // formData.append('title', data.get('title'));
    // formData.append('description', data.get('description'));
    // formData.append('author', "Richardo");
    // formData.append('category', data.get('category'));
    // formData.append('publishedYear', new Date().getFullYear());
    // formData.append('authorId', 1);
    // formData.append('citecount', 0);
    // formData.append('Pdf', data.get('file'));

//     console.log(formData.get('title'));
//     console.log(formData.get('Pdf'));

    // const response = fetch('http://localhost:8010/gateway/api/publish/pdf',{
    //     method: 'POST',
    //     body: formData
    // });

    // if(!response.ok){
    //     throw json({message: 'Could not save paper.'}, {status: 500});
    // }

    // return redirect('/paper');
// }