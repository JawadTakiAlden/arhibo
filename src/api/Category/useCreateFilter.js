import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "../request";
const useCreateFilter = () => {
    const { categoryID } = useParams();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
  
    const createFilterRequest =(data) => {
      return request({
        url: `/filters`,
        method: "post",
        data,
      });
    }
  
    const mutation = useMutation({
      mutationFn: createFilterRequest,
      mutationKey: [`create-filter`],
      onSuccess: (data) => {
        queryClient.refetchQueries([`get-filters-of-category-${categoryID}`]);
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

export default useCreateFilter