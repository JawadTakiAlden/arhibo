import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';

const useStoreOrUpdate = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const createOrUpdateContactRequest = (data) => {
        return request({
            url : `/contactUs`,
            method : 'post',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : createOrUpdateContactRequest,
        mutationKey : [`create-faq`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-all-contact-us`])
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

export default useStoreOrUpdate