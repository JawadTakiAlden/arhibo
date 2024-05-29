import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
const useUpdateFeatuer = () => {
const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const updateFeatuerRequest = ({featuerID , data}) => {
    return request({
      url: `/features/${featuerID}`,
      method: "patch",
      data
    });
  };

  const mutation = useMutation({
    mutationFn: updateFeatuerRequest,
    mutationKey: [`update-featuer`],
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
}

export default useUpdateFeatuer