import { useCallback } from "react";
import { useParams } from "react-router";
import { request } from "../request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const useUpdateCategory = () => {
  const { catgeoryID } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const updateCategoryRequest = useCallback((data) => {
    return request({
      url: `/categories/${catgeoryID}`,
      method: "post",
      headers : {
        'Content-Type' : 'multipart/form-data'
      },
      data,
    } , [catgeoryID]);
  });
  const mutation = useMutation({
    mutationFn: updateCategoryRequest,
    mutationKey: [`update-category`],
    onSuccess: (data) => {
      queryClient.refetchQueries(["get-all-categories"]);
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

export default useUpdateCategory;

// /categories_image/66001a0a9f818_categories_image.png
