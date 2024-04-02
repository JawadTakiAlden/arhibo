import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
import { useNavigate, useParams } from 'react-router';


const useDeleteFaq = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {faqID} = useParams()
    const navigate = useNavigate()
    const deleteFaqRequest = () => {
        return request({
            url : `/faq/${faqID}`,
            method : 'delete',
        })
    }

    const mutation = useMutation({
        mutationFn : deleteFaqRequest,
        mutationKey : [`delete-faq`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-all-faq`])
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            navigate('/dashboard/faqs')
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    return mutation
}

export default useDeleteFaq