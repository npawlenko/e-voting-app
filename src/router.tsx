import App from "App";
import ErrorPage from "components/ErrorPage";
import Poll from "components/poll/Poll";
import Login from "features/auth/Login";
import Register from "features/auth/Register";
import Home from "features/home/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "auth",
                children: [
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "register",
                        element: <Register />
                    },
                ]
            },
            {
                path: "poll",
                children: [
                    {
                        path: ":id",
                        element: <Poll />
                    }
                ]
            }
        ]
    }
]);

export default router;
