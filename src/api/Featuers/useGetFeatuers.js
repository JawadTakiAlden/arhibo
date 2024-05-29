import { request } from "../request";
import { useQuery } from "@tanstack/react-query";

const useGetFeatuers = () => {
  const getAllFeatuers = () => {
    return request({
      url: `/features`,
    });
  };

  const query = useQuery({
    queryFn: getAllFeatuers,
    queryKey: ["get-all-featuers"],
  });

  return query;
};

export default useGetFeatuers;
