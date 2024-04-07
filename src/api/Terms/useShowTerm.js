import { useQuery } from "@tanstack/react-query";
import { request } from "../request";
import { useParams } from "react-router";

const useShowTerm = () => {
    const {termID} = useParams()
    const showTermRequest = () => {
        return request({
          url: `/term/${termID}`,
        });
      };
    
      const query = useQuery({
        queryFn: showTermRequest,
        queryKey: [`show-term-${termID}`],
      });
    
      return query;
}

export default useShowTerm