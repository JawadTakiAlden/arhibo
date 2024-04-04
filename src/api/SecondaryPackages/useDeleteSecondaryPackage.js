import { useSnackbar } from 'notistack';
import React from 'react'
import { request } from '../request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteSecondaryPackage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient= useQueryClient()
    const deleteSecondaryPackageRequest = (secondaryPackageID) => {
        return request({
            url : `/additionalPackage/${secondaryPackageID}`,
            method : 'delete',
        })
    }

    const mutation = useMutation({
        mutationFn : deleteSecondaryPackageRequest,
        mutationKey : [`delete-secondary-package`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-secondary-packages`])
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    return mutation
}

export default useDeleteSecondaryPackage