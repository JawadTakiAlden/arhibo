import { request } from '../request';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

const useDeleteTerm = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {termID} = useParams()
    const navigate = useNavigate()
    const deleteTermRequest = () => {
        return request({
            url : `/terms/${termID}`,
            method : 'delete'
        })
    }

    const mutation = useMutation({
        mutationFn : deleteTermRequest,
        mutationKey : [`delete-term`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-all-terms`])
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            navigate('/dashboard/terms')
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    return mutation
}

export default useDeleteTerm