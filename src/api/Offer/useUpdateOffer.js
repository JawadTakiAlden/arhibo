import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
const useUpdateOffer = () => {
const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const updateOfferRequest = (data) => {
        return request({
            url : `/offers`,
            method : 'post',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : updateOfferRequest,
        mutationKey : [`update-offer`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-all-offers`])
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

export default useUpdateOffer