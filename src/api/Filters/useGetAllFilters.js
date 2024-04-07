import { useQuery } from "@tanstack/react-query";
import { request } from "../request";

const useGetAllFilters = () => {
  const getAllFiltersRequest = () => {
    return request({
      url: `/filters`,
    });
  };

  const query = useQuery({
    queryFn: getAllFiltersRequest,
    queryKey: ["get-all-filters"],
  });

  return query;
};

export default useGetAllFilters;
