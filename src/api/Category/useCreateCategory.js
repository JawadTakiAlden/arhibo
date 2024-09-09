import { useCallback } from 'react'
import { request } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router'

const useCreateCategory = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const router = useNavigate()

    const createCategoryRequest = useCallback((data) => {
        return request({
            url : `/categories`,
            method : 'post',
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data
        })
    })

    const mutation = useMutation({
        mutationFn : createCategoryRequest,
        mutationKey : [`create-category`],
        onSuccess : (data) => {
            queryClient.refetchQueries(['get-all-categories'])
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            router(-1)
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    return mutation
}

export default useCreateCategory



// /categories_image/66001a0a9f818_categories_image.png