import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react'
import { request } from '../request';
import { useParams } from 'react-router';

const useUpdatePackage = () => {
 const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {packageID} = useParams()
    const updatePackageRequest = (data) => {
        return request({
            url : `/packages/${packageID}`,
            method : 'patch',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : updatePackageRequest,
        mutationKey : [`update-package`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-packages`])
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

export default useUpdatePackage