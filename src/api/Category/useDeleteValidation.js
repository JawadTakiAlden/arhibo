import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "../request";
import { useCallback } from "react";

const useDeleteValidation = () => {
  const { categoryID } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const deleteValidationRequest = (valodationID) => {
    return request({
      url: `/validates/${valodationID}`,
      method: "delete",
    });
  }

  const mutation = useMutation({
    mutationFn: deleteValidationRequest,
    mutationKey: [`delete-validation`],
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

export default useDeleteValidation;
