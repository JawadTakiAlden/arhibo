import { useNavigate } from "react-router";
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

  await testMutation.mutateAsync()

  if(testMutation.status === 401){
    navigate('/auth/login')
  }

  return children
};

export default ServerSideAuthUser;
