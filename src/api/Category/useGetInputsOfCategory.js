import { useQuery } from '@tanstack/react-query'
import { request } from '../request'
import { useCallback } from 'react'
import { useParams } from 'react-router'

const useGetInputsOfCategory = () => {
    const {catgeoryID} = useParams()
    const getInputsOfCategoryRequest = useCallback(() => {
        return request({
            url : `/categories/${catgeoryID}/inputs`,
        })
    } , [catgeoryID])
    const query = useQuery({
        queryFn : getInputsOfCategoryRequest,
        queryKey : [`get-inputs-of-category-${catgeoryID}`],
    })
    return query
}

export default useGetInputsOfCategory