import { useParams } from 'react-router'
import { request } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

const useUpdateCoupon = () => {
const {couponID} = useParams()
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();

    const updateCouponRequest = (data) => {
        return request({
            url : `/coupons/${couponID}`,
            method : 'patch',
            data
        })
    }

    const mutation = useMutation({
        mutationFn : updateCouponRequest,
        mutationKey : [`update-coupon`],
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

export default useUpdateCoupon