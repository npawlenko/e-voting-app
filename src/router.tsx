import App from "App";
import ErrorPage from "components/ErrorPage";
import Login from "features/auth/Login";
import Register from "features/auth/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
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
                    }
                ]
            },
        ]
    }
]);

export default router;
