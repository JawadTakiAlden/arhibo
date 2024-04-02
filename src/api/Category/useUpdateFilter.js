import { useParams } from 'react-router'
import { request } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
const useUpdateFilter = () => {
    const { categoryID } = useParams();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
  
    const updateFilterRequest = ({data , filterID}) => {
      return request({
        url: `/filters/${filterID}`,
        method: "patch",
        data
      });
    };
  
    const mutation = useMutation({
      mutationFn: updateFilterRequest,
      mutationKey: [`update-filter`],
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

export default useUpdateFilter