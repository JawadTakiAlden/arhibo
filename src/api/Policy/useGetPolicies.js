import { request } from "../request";
import { useQuery } from "@tanstack/react-query";


const useGetPolicies = () => {
    const getAllPrivacyPolicy = () => {
        return request({
          url: `/privacyPolicy`,
        });
      };
    
      const query = useQuery({
        queryFn: getAllPrivacyPolicy,
        queryKey: ["get-all-policies"],
      });
    
      return query;
}

export default useGetPolicies