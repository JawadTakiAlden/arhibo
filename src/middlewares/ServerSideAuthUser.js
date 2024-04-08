import { Outlet, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { request } from "../api/request";

const ServerSideAuthUser = async ({children}) => {
  const navigate = useNavigate();
  const testMutation = useMutation({
    mutationKey: ["checl-server-side-auth"],
    mutationFn: () => {
      return request({
        url: "/terms",
      });
    },
  });

  const response = await testMutation.mutateAsync()

  if(response.status === 401){
    navigate('/auth/login')
  }

  return <Outlet />
};

export default ServerSideAuthUser;
