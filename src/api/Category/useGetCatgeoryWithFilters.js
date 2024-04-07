import React from 'react'
import { request } from '../request'
import { useQuery } from '@tanstack/react-query'

const useGetCatgeoryWithFilters = () => {
    const getAllCategoriesWithFilters = () => {
        return request({
            url : `/categoryWithFilter`
        })
    }

    const query = useQuery({
        queryFn : getAllCategoriesWithFilters,
        queryKey : ['get-all-categories-with-filters']
    })

    return query
}

export default useGetCatgeoryWithFilters