import App from "App";
import ErrorPage from "components/ErrorPage";
import Poll from "features/poll/Poll";
import Login from "features/auth/Login";
import Register from "features/auth/Register";
import Home from "features/home/Home";
import { createBrowserRouter } from "react-router-dom";
import EditPoll from "features/poll/form/EditPoll";
import CreatePoll from "features/poll/form/CreatePoll";
import ResetPassword from "features/auth/ResetPassword";
import UserEdit from "features/user/form/UserEdit";

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
                    {
                        path: "reset",
                        element: <ResetPassword />,
                        children: [
                            {
                                path: ":token"
                            }
                        ]
                    }
                ]
            },
            {
                path: "poll",
                children: [
                    {
                        path: ":id",
                        element: <Poll />,
                        children: [
                            {
                                path: ":token"
                            }
                        ]
                    },
                    {
                        path: "edit/:id",
                        element: <EditPoll />
                    },
                    {
                        path: "create",
                        element: <CreatePoll />
                    }
                ]
            },
            {
                path: "user",
                children: [
                    {
                        path: "edit/:id",
                        element: <UserEdit />
                    }
                ]
            }
        ]
    }
]);

export default router;
