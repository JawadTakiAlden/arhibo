import { useCallback } from "react"
import { request } from "../request"
import { useQuery } from "@tanstack/react-query"

const useGetAllCategories = (search = null) => {
    const getAllCategories = useCallback(() => {
        return request({
            url : `/searchCategories${search ? `?search=${search}` : ''}`
        })
    })

    const query = useQuery({
        queryFn : getAllCategories,
        queryKey : ['get-all-categories']
    })

    return query
}

export default useGetAllCategories