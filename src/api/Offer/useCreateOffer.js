import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
const useCreateOffer = () => {
  const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const createOfferRequest = (data) => {
        return request({
            url : `/offers`,
            method : 'post',
            headers : {
                "Content-Type" : "multipart/form-data"
            },
            data
        })
    }

    const mutation = useMutation({
        mutationFn : createOfferRequest,
        mutationKey : [`create-offer`],
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

export default useCreateOffer