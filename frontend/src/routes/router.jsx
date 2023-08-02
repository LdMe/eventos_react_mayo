import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Upcoming from "./Upcoming";
import ErrorPage from "./error";
import Favorites from "../components/Favorites";

const Router = createBrowserRouter([
    {
        path: "/",
        element:<Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:"/",
                element: <Upcoming />
            },
            {
                path:"/favorites",
                element: <Favorites />
            }
        ]
    },
]);

export default Router;