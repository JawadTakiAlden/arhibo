import { request } from "../request";
import { useQuery } from "@tanstack/react-query";

const useGetOffers = () => {
  const getAllFaqs = () => {
    return request({
      url: `/offers`,
    });
  };

  const query = useQuery({
    queryFn: getAllFaqs,
    queryKey: ["get-all-offers"],
  });

  return query;
};

export default useGetOffers;
