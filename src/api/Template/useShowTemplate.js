import { useParams } from 'react-router';
import { request } from '../request';
import { useQuery } from '@tanstack/react-query';


const useShowTemplate = () => {
    const {templateID} = useParams()
    const getAllTemplatesRequest = () => {
        return request({
          url: `/template/${templateID}`,
        });
      };
    
      const query = useQuery({
        queryFn: getAllTemplatesRequest,
        queryKey: [`show-templates-${templateID}`],
      });
    
      return query;
}

export default useShowTemplate