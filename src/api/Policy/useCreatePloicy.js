import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';


const useCreatePloicy = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();

    const createPolicyRequest = (data) => {
        return request({
            url : `/privacyPolicy`,
            method : 'post',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : createPolicyRequest,
        mutationKey : [`create-policy`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-all-policies`])
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

export default useCreatePloicy