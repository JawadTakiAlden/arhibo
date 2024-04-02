import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
const useCreatePrihibited = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const createProhibitedThingRequest = (data) => {
    return request({
      url: `/prohibitedThing`,
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: createProhibitedThingRequest,
    mutationKey: [`create-prohibited-thing`],
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

export default useCreatePrihibited;
