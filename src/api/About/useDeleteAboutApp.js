import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
import { useNavigate, useParams } from "react-router";
const useDeleteAboutApp = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { aboutID } = useParams();
  const navigate = useNavigate()
  const updateAboutRequest = () => {
    return request({
      url: `/about_apps/${aboutID}`,
      method: "delete",
    });
  };

  const mutation = useMutation({
    mutationFn: updateAboutRequest,
    mutationKey: [`update-about-app`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-about-apps`]);
      enqueueSnackbar(data?.data?.message, { variant: "success" });
      navigate('/dashboard/about')
    },
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    },
  });

  return mutation;
};

export default useDeleteAboutApp;
