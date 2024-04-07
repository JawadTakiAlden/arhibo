import { useQuery } from "@tanstack/react-query";
import { request } from "../request";

const useGetStatistics = () => {
  const getStatisticsRequest = () => {
    return request({
      url: `/statistics`,
    });
  };

  const query = useQuery({
    queryFn: getStatisticsRequest,
    queryKey: ["get-statistics"],
  });

  return query;
};

export default useGetStatistics;
