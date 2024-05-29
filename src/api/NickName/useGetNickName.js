import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
const useGetNickName = () => {
  const getAllNickName = () => {
    return request({
      url: `/nicknames`,
    });
  };

  const query = useQuery({
    queryFn: getAllNickName,
    queryKey: ["get-all-nicknames"],
  });

  return query;
};

export default useGetNickName;
