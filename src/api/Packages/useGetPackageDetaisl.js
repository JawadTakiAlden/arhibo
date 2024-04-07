import { useQuery } from "@tanstack/react-query";
import { request } from "../request";
import { useParams } from "react-router";

const useGetPackageDetaisl = () => {
    const {packageID} = useParams()
  const getCouponsFaqs = () => {
    return request({
      url: `/packageDetails/${packageID}`,
    });
  };

  const query = useQuery({
    queryFn: getCouponsFaqs,
    queryKey: ["get-package-details"],
  });

  return query;
};

export default useGetPackageDetaisl;
