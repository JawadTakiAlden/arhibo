import { useQuery } from "@tanstack/react-query";
import { request } from "../request";
import { useParams } from "react-router";

const useShowFaq = () => {
const {faqID} = useParams()
    const showFaqRequest = () => {
        return request({
          url: `/faq/${faqID}`,
        });
      };
    
      const query = useQuery({
        queryFn: showFaqRequest,
        queryKey: [`show-faq-${faqID}`],
      });
    
      return query;
}   

export default useShowFaq