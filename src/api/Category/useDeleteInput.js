import { useCallback } from 'react'
import { useParams } from 'react-router'
import { request } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

const useDeleteInput = () => {
    const {categoryID} = useParams()
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();

    const deleteInputRequest = (inputID) => {
        return request({
            url : `/inputs/${inputID}`,
            method : 'delete'
        })
    }

    const mutation = useMutation({
        mutationFn : deleteInputRequest,
        mutationKey : [`delete-input`],
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-inputs-of-category-${categoryID}`])
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

export default useDeleteInput



// /categories_image/66001a0a9f818_categories_image.png