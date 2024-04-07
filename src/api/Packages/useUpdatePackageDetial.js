import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
const useUpdatePackageDetial = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const updatePackageDetailRequest = ({id , data}) => {
    return request({
      url: `/packageDetails/${id}`,
      method: "patch",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: updatePackageDetailRequest,
    mutationKey: [`update-package-details`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-packages`]);
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

export default useUpdatePackageDetial;
