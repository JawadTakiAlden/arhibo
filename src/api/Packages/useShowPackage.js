import { useQuery } from "@tanstack/react-query";
import { request } from "../request";
import { useParams } from "react-router";

const useShowPackage = () => {
    const {packageID} = useParams()
    const showPackageRequest = () => {
        return request({
          url: `/package/${packageID}`,
        });
      };
    
      const query = useQuery({
        queryFn: showPackageRequest,
        queryKey: [`show-package-${packageID}`],
      });
    
      return query;
}

export default useShowPackage