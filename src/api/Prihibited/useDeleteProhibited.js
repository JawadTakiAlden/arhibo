import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
const useDeleteProhibited = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const deletegetProhibitedThingRequest = (prohibitedID) => {
      return request({
        url: `/prohibitedThing/${prohibitedID}`,
        method: "delete",
      });
    };
  
    const mutation = useMutation({
      mutationFn: deletegetProhibitedThingRequest,
      mutationKey: [`delete-prohibited-thing`],
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
  };

export default useDeleteProhibited