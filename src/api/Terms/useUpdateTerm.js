import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';
import { request } from '../request';

const useUpdateTerm = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {termID} = useParams()
    const updateTermRequest = (data) => {
        return request({
            url : `/terms/${termID}`,
            method : 'patch',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : updateTermRequest,
        mutationKey : [`update-term`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-all-terms`])
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

export default useUpdateTerm