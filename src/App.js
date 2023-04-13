import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import AuthorPaper, {loaderFunction as authorLoader} from "./pages/AuthorPaper";
import EditPaper, {loader as editLoader} from "./pages/EditPaper";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import Paper, { loaderFunction } from "./pages/Paper";
import PaperDetail, {loader as detailLoader} from "./pages/PaperDetail";
import PaperRoot from "./pages/PaperRoot";
import RootLayout from "./pages/Root";
import NewPaper from "./pages/NewPaper";
import AuthenticationPage from "./pages/Authentication";
import { action as logoutAction} from './pages/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "/about", element: <About /> },
      {path: "/author/paper", element: <AuthorPaper/>, loader: authorLoader},
      {path: "/author/paper/edit/:id", element: <EditPaper/>, loader: editLoader},
      {
        path: "/paper",
        element: <PaperRoot />,
        children: [
          {
            path: "",
            element: <Paper />,
            loader: loaderFunction,
          },
          { path: "/paper/detail/:id", element: <PaperDetail />, loader: detailLoader },
          {path:"/paper/publish", element: <NewPaper/>},
        ],
      },
      {path:'logout', action: logoutAction}
    ],
    
  },
  {path:"/auth",element: <AuthenticationPage/>,}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
