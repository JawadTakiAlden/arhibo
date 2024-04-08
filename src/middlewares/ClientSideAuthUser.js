import { Outlet, useNavigate } from "react-router";
const ClientSideAuthUser = ({children}) => {
  const token = localStorage.getItem("token_admin_arhibo");
  const navigate = useNavigate();
  if (!token) {
    navigate("/auth/login");
  }
  return <Outlet />
};

export default ClientSideAuthUser;
