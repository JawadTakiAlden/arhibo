import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';

const useCreatePackage = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const createPackageRequest = (data) => {
        return request({
            url : `/packages`,
            method : 'post',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : createPackageRequest,
        mutationKey : [`create-package`],
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

export default useCreatePackage