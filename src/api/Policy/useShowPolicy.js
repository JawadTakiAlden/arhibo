import { useQuery } from "@tanstack/react-query";
import { request } from "../request";
import { useParams } from "react-router";

const useShowPolicy = () => {
const {policyID} = useParams()
    const showPackageRequest = () => {
        return request({
          url: `/privacyPolicy/${policyID}`,
        });
      };
    
      const query = useQuery({
        queryFn: showPackageRequest,
        queryKey: [`show-policy-${policyID}`],
      });
    
      return query;
}

export default useShowPolicy