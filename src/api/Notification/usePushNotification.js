import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { request } from "../request";

const usePushNotification = () => {
    const { enqueueSnackbar } = useSnackbar();
    const pushNotificationRequest  = (data) => {
        return request({
            url : `/sendNotificationToAllUsers`,
            method : 'post',
            data
        })
    }

    const query = useMutation({
        mutationKey : [`push-notification`],
        mutationFn : pushNotificationRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = (data) => {
        query.mutate(data)
    }

  return {
    callFunction : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default usePushNotification