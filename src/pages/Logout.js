import { redirect } from "react-router-dom";

export function action(){
    localStorage.removeItem('token');
    localStorage.removeItem('Id');
    localStorage.removeItem('status');
    return redirect('/auth');
}