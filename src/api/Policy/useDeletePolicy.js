import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
import { useNavigate, useParams } from 'react-router';


const useDeletePloicy = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {policyID} = useParams()
    const navigate = useNavigate()
    const deletePolicyRequest = () => {
        return request({
            url : `/privacyPolicy/${policyID}`,
            method : 'delete',
        })
    }

    const mutation = useMutation({
        mutationFn : deletePolicyRequest,
        mutationKey : [`delete-policy`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-all-policies`])
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            navigate('/dashboard/policies')
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    return mutation
}

export default useDeletePloicy