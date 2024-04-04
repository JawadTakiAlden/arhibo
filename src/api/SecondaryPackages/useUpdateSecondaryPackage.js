import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
import { useParams } from "react-router";

const useUpdateSecondaryPackage = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const updateSecondaryPackageRequest = ({id , data}) => {
    return request({
      url: `/additionalPackage/${id}`,
      method: "patch",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: updateSecondaryPackageRequest,
    mutationKey: [`update-secondary-package`],
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

export default useUpdateSecondaryPackage;
