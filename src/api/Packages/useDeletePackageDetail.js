import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useParams } from 'react-router';
import { request } from '../request';

const useDeletePackageDetail = () => {
    const { packageID } = useParams();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
  
    const deletePackageDetailRequest = (detailID) => {
      return request({
        url: `/packageDetails/${detailID}`,
        method: "delete",
      });
    };
  
    const mutation = useMutation({
      mutationFn: deletePackageDetailRequest,
      mutationKey: [`delete-package-detail`],
      onSuccess: (data) => {
        // queryClient.refetchQueries([`get-filters-of-category-${categoryID}`]);
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

export default useDeletePackageDetail