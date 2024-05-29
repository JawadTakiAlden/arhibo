import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
const useCreateNickName = () => {
 const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const createNickNameRequest = (data) => {
    return request({
      url: `/nicknames`,
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: createNickNameRequest,
    mutationKey: [`create-nickname`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-all-nicknames`]);
      enqueueSnackbar(data?.data?.message, { variant: "success" });
    },
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    },
  });

  return mutation;
}

export default useCreateNickName