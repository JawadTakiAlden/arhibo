import { useParams } from "react-router";
import { request } from "../request";
import { useQuery } from "@tanstack/react-query";

const useShowAbout = () => {
    const {aboutID} = useParams()
    const getAllAbout = () => {
        return request({
          url: `/about_apps/${aboutID}`,
        });
      };
    
      const query = useQuery({
        queryFn: getAllAbout,
        queryKey: [`shwo-about-app-${aboutID}`],
      });
    
      return query;
}

export default useShowAbout