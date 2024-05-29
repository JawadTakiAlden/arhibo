import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
const useUpdateNickName = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const updateNickNameRequest = ({ nickNameID, data }) => {
    return request({
      url: `/nicknames/${nickNameID}`,
      method: "patch",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: updateNickNameRequest,
    mutationKey: [`update-nickname`],
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

export default useUpdateNickName;
