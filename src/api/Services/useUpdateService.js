import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';
import { request } from '../request';

const useUpdateService = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {serviceID} = useParams()
    const updateServiceRequest = (data) => {
        return request({
            url : `/services/${serviceID}`,
            method : 'post',
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data
        })
    }

    const mutation = useMutation({
        mutationFn : updateServiceRequest,
        mutationKey : [`update-service`],
        onSuccess : (data) => {
            queryClient.refetchQueries(['get-all-service'])
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

export default useUpdateService