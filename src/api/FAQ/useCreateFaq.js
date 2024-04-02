import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
const useCreateFaq = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const createFaqRequest = (data) => {
        return request({
            url : `/faq`,
            method : 'post',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : createFaqRequest,
        mutationKey : [`create-faq`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-all-faq`])
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

export default useCreateFaq