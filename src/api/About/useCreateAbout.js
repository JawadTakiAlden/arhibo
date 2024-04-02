import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
const useCreateAbout = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const createFaqRequest = (data) => {
        return request({
            url : `/about_apps`,
            method : 'post',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : createFaqRequest,
        mutationKey : [`create-about-app`],
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

export default useCreateAbout