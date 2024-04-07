import { useQuery } from "@tanstack/react-query";
import { request } from "../request";
import { useParams } from "react-router";

const useShowService = () => {
const {serviceID} = useParams()
    const showServiceRequest = () => {
        return request({
          url: `/service/${serviceID}`,
        });
      };
    
      const query = useQuery({
        queryFn: showServiceRequest,
        queryKey: [`show-service-${serviceID}`],
      });
    
      return query;
}

export default useShowService