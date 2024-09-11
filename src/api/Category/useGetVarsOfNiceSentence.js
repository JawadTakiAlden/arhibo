import { useQuery } from '@tanstack/react-query'
import { request } from '../request'
import { useCallback } from 'react'
import { useParams } from 'react-router'

const useGetVarsOfNiceSentence = (q = "create" , category_id = null) => {
    const {catgeoryID} = useParams()
    const getInformationRequest = useCallback(() => {
        return request({
            url : `/getInformation`,
            params : {
                q : q,
                ...(category_id && {
                    category_id
                })
            }
        })
    } , [catgeoryID])
    const query = useQuery({
        queryFn : getInformationRequest,
        queryKey : [`get-inforamtion-${q}-${category_id}`],
    })
    return query
}

export default useGetVarsOfNiceSentence