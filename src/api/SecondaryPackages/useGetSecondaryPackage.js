import { request } from '../request';
import { useQuery } from '@tanstack/react-query';

const useGetSecondaryPackage = () => {
    const getSecondaryPackages = () => {
        return request({
          url: `/additionalPackage`,
        });
      };
    
      const query = useQuery({
        queryFn: getSecondaryPackages,
        queryKey: ["get-secondary-packages"],
      });
    
      return query;
}

export default useGetSecondaryPackage