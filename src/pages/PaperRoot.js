import { Outlet } from "react-router-dom";
import PaperNavigation from "../components/PaperNavigation";

function PaperRoot(){
    return(
        <>
      <PaperNavigation />
      <Outlet />
    </>
    );
}

export default PaperRoot;