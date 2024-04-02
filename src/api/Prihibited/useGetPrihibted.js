import { request } from '../request';
import { useQuery } from '@tanstack/react-query';

const useGetPrihibted = () => {
 const getAllFaqs = () => {
        return request({
          url: `/prohibitedThing`,
        });
      };
    
      const query = useQuery({
        queryFn: getAllFaqs,
        queryKey: ["get-prohibited-thing"],
      });
    
      return query;
}

export default useGetPrihibted