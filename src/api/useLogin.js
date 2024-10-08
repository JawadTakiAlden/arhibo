import { useMutation } from "@tanstack/react-query";
import { request } from "./request";
import { useNavigate } from "react-router";
import useOnError from "./useOnError";
import useOnSuccess from "./useOnSuccess";
import { useSnackbar } from "notistack";

const useLogin = () => {
  const { successHandeler } = useOnSuccess();
  const { enqueueSnackbar } = useSnackbar();
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
      if (data?.data?.user?.type !== 1) {
        enqueueSnackbar("permission denide", { variant: "error" });
        return;
      }
      localStorage.setItem("token_admin_arhibo", data.data.access_token);
      enqueueSnackbar("sign in successfully , welcome back", {
        variant: "success",
      });
      navigate("/dashboard/home");
    },
    onError: (error) => {
      console.log(error)
      if (error.response) {
        enqueueSnackbar(error.response.data.error, { variant: "error" });
      }
    },
  });
  return {
    ...mutate,
  };
};

export default useLogin;
