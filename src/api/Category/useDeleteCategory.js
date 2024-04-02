import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'
import { request } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

const useDeleteCategory = () => {
    const {catgeoryID} = useParams()
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const naviagte = useNavigate()

    const deleteCategoryRequest = useCallback(() => {
        return request({
            url : `/categories/${catgeoryID}`,
            method : 'delete'
        })
    } , [catgeoryID])

    const mutation = useMutation({
        mutationFn : deleteCategoryRequest,
        mutationKey : [`delete-category`],
        onSuccess : (data) => {
            queryClient.refetchQueries(['get-all-categories'])
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            naviagte('/dashboard/categories')
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    return mutation
}

export default useDeleteCategory



// /categories_image/66001a0a9f818_categories_image.png