import { request } from '../request';
import { useQuery } from '@tanstack/react-query';

const useGetContact = () => {
  const getAllContact = () => {
        return request({
          url: `/contactUs`,
        });
      };
    
      const query = useQuery({
        queryFn: getAllContact,
        queryKey: ["get-all-contact-us"],
      });
    
      return query;
}

export default useGetContact