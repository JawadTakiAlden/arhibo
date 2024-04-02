import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';
import { useNavigate, useParams } from 'react-router';

const useDeletePackage = () => {
 const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const {packageID} = useParams()
    const navigate = useNavigate()
    const deletePackageRequest = () => {
        return request({
            url : `/packages/${packageID}`,
            method : 'delete',
        })
    }

    const mutation = useMutation({
        mutationFn : deletePackageRequest,
        mutationKey : [`delete-package`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-packages`])
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            navigate('/dashboard/packages')
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    return mutation
}

export default useDeletePackage