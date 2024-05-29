import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";

const useDeleteFeatuer = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const deleteFeatuerRequest = (featuerID) => {
    return request({
      url: `/features/${featuerID}`,
      method: "delete",
    });
  };

  const mutation = useMutation({
    mutationFn: deleteFeatuerRequest,
    mutationKey: [`delete-featuer`],
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

export default useDeleteFeatuer;
