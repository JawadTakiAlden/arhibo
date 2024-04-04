import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";

const useCreateSecondaryPackage = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const createSecondaryPackageRequest = (data) => {
    return request({
      url: `/additionalPackage`,
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: createSecondaryPackageRequest,
    mutationKey: [`create-secondary-package`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-secondary-packages`]);
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

export default useCreateSecondaryPackage;
