import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';

const useCreateService = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();

    const createServiceRequest = (data) => {
        return request({
            url : `/services`,
            method : 'post',
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data
        })
    }

    const mutation = useMutation({
        mutationFn : createServiceRequest,
        mutationKey : [`create-service`],
        onSuccess : (data) => {
            queryClient.refetchQueries(['get-all-service'])
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

export default useCreateService