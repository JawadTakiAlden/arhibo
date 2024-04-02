import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
import { useParams } from 'react-router';

const useUpdateFaq = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {faqID} = useParams()
    const updateFaqRequest = (data) => {
        return request({
            url : `/faq/${faqID}`,
            method : 'patch',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : updateFaqRequest,
        mutationKey : [`update-faq`],
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

export default useUpdateFaq