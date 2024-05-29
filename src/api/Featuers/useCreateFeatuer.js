import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
const useCreateFeatuer = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const createFeatuerRequest = (data) => {
    return request({
      url: `/features`,
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: createFeatuerRequest,
    mutationKey: [`create-featuer`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-all-featuers`]);
      enqueueSnackbar(data?.data?.message, { variant: "success" });
    },
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    },
  });

  return mutation;
};

export default useCreateFeatuer;
