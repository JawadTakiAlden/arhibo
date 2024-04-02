import React, { useCallback } from 'react'
import { useParams } from 'react-router'
import { request } from '../request'
import { useQuery } from '@tanstack/react-query'

const useGetFiltersOfCategory = (M_CategoryID = null) => {
    const {catgeoryID} = useParams()
    const getFiltersOfCategoryRequest = () => {
        return request({
            url : `/categories/${catgeoryID || M_CategoryID}/filters`,
        })
    }
    const query = useQuery({
        queryFn : getFiltersOfCategoryRequest,
        queryKey : [`get-filters-of-category-${catgeoryID}`],
        enabled : Boolean(catgeoryID) || Boolean(M_CategoryID)
    })
    return query
}

export default useGetFiltersOfCategory