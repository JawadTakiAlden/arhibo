import { useQuery } from "@tanstack/react-query";
import { request } from "../request";

const useGetPackages = () => {
    const getCouponsFaqs = () => {
        return request({
          url: `/packages`,
        });
      };
    
      const query = useQuery({
        queryFn: getCouponsFaqs,
        queryKey: ["get-packages"],
      });
    
      return query;
}

export default useGetPackages