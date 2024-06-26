import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from '../request';

const useDeleteCoupon = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const deleteCouponRequest = (id) => {
        return request({
            url : `/coupons/${id}`,
            method : 'delete',
        })
    }

    const mutation = useMutation({
        mutationFn : deleteCouponRequest,
        mutationKey : [`delete-coupon`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-coupons`])
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

export default useDeleteCoupon