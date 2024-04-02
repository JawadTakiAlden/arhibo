import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
import { useParams } from 'react-router';


const useUpdatePloicy = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {policyID} = useParams()
    const updatePolicyRequest = (data) => {
        return request({
            url : `/privacyPolicy/${policyID}`,
            method : 'patch',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : updatePolicyRequest,
        mutationKey : [`update-policy`],
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

export default useUpdatePloicy