import { request } from '../request';
import { useQuery } from '@tanstack/react-query';

const useGetTemplates = (search = null) => {
    const getAllTemplatesRequest = () => {
        return request({
          url: `/searchTemplate${search ? `search=${search}` : ''}`,
        });
      };
    
      const query = useQuery({
        queryFn: getAllTemplatesRequest,
        queryKey: ["get-all-templates"],
      });
    
      return query;
}

export default useGetTemplates