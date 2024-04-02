import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
import { useParams } from 'react-router';

const useUpdateAbout = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {aboutID} = useParams()
    const updateAboutRequest = (data) => {
        return request({
            url : `/about_apps/${aboutID}`,
            method : 'patch',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : updateAboutRequest,
        mutationKey : [`update-about-app`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-about-apps`])
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

export default useUpdateAbout