import { request } from '../request';
import { useQuery } from '@tanstack/react-query';

const useGetFaqs = () => {
    const getAllFaqs = () => {
        return request({
          url: `/faq`,
        });
      };
    
      const query = useQuery({
        queryFn: getAllFaqs,
        queryKey: ["get-all-faq"],
      });
    
      return query;
}

export default useGetFaqs