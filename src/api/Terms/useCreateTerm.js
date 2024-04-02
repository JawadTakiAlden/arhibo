import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';

const useCreateTerm = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();

    const createTermRequest = (data) => {
        return request({
            url : `/terms`,
            method : 'post',
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data
        })
    }

    const mutation = useMutation({
        mutationFn : createTermRequest,
        mutationKey : [`create-term`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-all-terms`])
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

export default useCreateTerm