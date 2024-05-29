import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";

const useDeleteNickName = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const deleteNickNameRequest = (nicknameID) => {
    return request({
      url: `/nicknames/${nicknameID}`,
      method: "delete",
    });
  };

  const mutation = useMutation({
    mutationFn: deleteNickNameRequest,
    mutationKey: [`delete-nickname`],
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
};

export default useDeleteNickName;
