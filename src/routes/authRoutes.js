import MinimalLayout from "../layouts/MinimalLayout";
import Login from "../views/auth/Login";

export const authRoutes = {
    path : 'auth',
    element : <MinimalLayout />,
    children : [
        {
            path : 'login',
            element : <Login />
        }
    ]
}