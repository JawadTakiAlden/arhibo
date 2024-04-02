import { useParams } from 'react-router'
import { request } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

const useDeleteFilter = () => {
  const { categoryID } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const deleteFilterRequest = (filterID) => {
    return request({
      url: `/filters/${filterID}`,
      method: "delete",
    });
  };

  const mutation = useMutation({
    mutationFn: deleteFilterRequest,
    mutationKey: [`delete-filter`],
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
};

export default useDeleteFilter;
