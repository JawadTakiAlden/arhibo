import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "../request";
import { useCallback } from "react";

const useCreateInput = () => {
  const { categoryID } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const createInputRequest = useCallback((data) => {
    return request({
      url: `/inputs`,
      method: "post",
      data,
    });
  });

  const mutation = useMutation({
    mutationFn: createInputRequest,
    mutationKey: [`create-input`],
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

export default useCreateInput;
