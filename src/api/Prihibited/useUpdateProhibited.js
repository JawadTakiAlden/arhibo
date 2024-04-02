import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
const useUpdateProhibited = () => {
    const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const updateProhibitedThingRequest = ({data , id}) => {
    return request({
      url: `/prohibitedThing/${id}`,
      method: "patch",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: updateProhibitedThingRequest,
    mutationKey: [`update-prohibited-thing`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-prohibited-thing`]);
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

export default useUpdateProhibited