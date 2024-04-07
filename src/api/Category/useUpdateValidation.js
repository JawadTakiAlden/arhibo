import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "../request";

const useUpdateValidation = () => {
  const { categoryID } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const updateValidationRequest = ({validationID , data}) => {
    return request({
      url: `/validates/${validationID}`,
      method: "patch",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: updateValidationRequest,
    mutationKey: [`update-validation`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-inputs-of-category-${categoryID}`]);
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

export default useUpdateValidation;
