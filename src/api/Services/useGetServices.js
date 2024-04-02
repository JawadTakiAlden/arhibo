import { request } from "../request";
import { useQuery } from "@tanstack/react-query";

const useGetServices = () => {
  const getAllServices = () => {
    return request({
      url: `/services`,
    });
  };

  const query = useQuery({
    queryFn: getAllServices,
    queryKey: ["get-all-service"],
  });

  return query;
};

export default useGetServices;
