import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Welcome from "../pages/Welcome/Welcome";
import Introduction from "../pages/Introduction/Introduction";
import Houses from "../pages/Houses/Houses";
import WhyCapsules from "../pages/WhyCapsules/WhyCapsules";
import Activities from "../pages/Activities/Activities";
import Feedback from "../pages/Feedback/Feedback";

const router = createBrowserRouter([
    {
        path: "/", // Sanskruti Design Studio
        element: <MainLayout />, // Layout wrapper
        children: [
            { path: "", element: <Home /> }, // default page
            { path: "welcome", element: <Welcome /> },
            { path: "introduction", element: <Introduction /> },
            { path: "houses", element: <Houses /> },
            { path: "why-capsules", element: <WhyCapsules /> },
            { path: "activities", element: <Activities /> },
            { path: "feedback", element: <Feedback /> },
        ],
    },
]);

export default router;
