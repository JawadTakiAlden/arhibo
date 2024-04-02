import { useCallback } from "react"
import { request } from "../request"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

const useShowCategory = () => {
    const {catgeoryID}= useParams()
    const showCategoryRequest = useCallback(() => {
        return request({
            url : `/categories/${catgeoryID}`
        })
    })

    const query = useQuery({
        queryFn : showCategoryRequest,
        queryKey : [`show-category-number-${catgeoryID}`]
    })

    return query
}

export default useShowCategory