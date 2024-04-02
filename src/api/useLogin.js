import { useMutation } from "@tanstack/react-query";
import { request } from "./request";
import { useNavigate } from "react-router";
import useOnError from "./useOnError";
import useOnSuccess from "./useOnSuccess";

const useLogin = () => {
  const { successHandeler } = useOnSuccess();
  const { errorHandeler } = useOnError();
  const navigate = useNavigate();
  const loginRequest = (data) => {
    return request({
      url: "/login",
      method: "post",
      data,
    });
  };

  const mutate = useMutation({
    mutationKey: ["login"],
    mutationFn: loginRequest,
    onSuccess: (data) => {
      successHandeler(data, () => {
        localStorage.setItem('token_admin_arhibo' , data.data.access_token)
        navigate('/dashboard/home')
      });
    },
    onError: (error) => {
      errorHandeler(error , () => {
        console.log(error?.response.data.error);
      });
    },
  });
  return {
    ...mutate,
  };
};

export default useLogin;
