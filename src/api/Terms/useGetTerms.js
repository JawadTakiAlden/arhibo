import { request } from "../request";
import { useQuery } from "@tanstack/react-query";

const useGetTerms = () => {
    const getAllServices = () => {
        return request({
          url: `/terms`,
        });
      };
    
      const query = useQuery({
        queryFn: getAllServices,
        queryKey: ["get-all-terms"],
      });
    
      return query;
}

export default useGetTerms