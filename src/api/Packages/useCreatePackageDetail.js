import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
const useCreatePackageDetail = () => {
     const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const createPackageDetailRequest = (data) => {
        return request({
            url : `/packageDetails`,
            method : 'post',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : createPackageDetailRequest,
        mutationKey : [`create-package-details`],
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

export default useCreatePackageDetail