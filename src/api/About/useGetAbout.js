import { useQuery } from "@tanstack/react-query";
import { request } from "../request";

const useGetAbout = () => {
    const getAllFaqs = () => {
        return request({
          url: `/about_apps`,
        });
      };
    
      const query = useQuery({
        queryFn: getAllFaqs,
        queryKey: ["get-about-apps"],
      });
    
      return query;
}

export default useGetAbout