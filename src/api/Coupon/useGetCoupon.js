import { useQuery } from "@tanstack/react-query";
import { request } from "../request";

const useGetCoupon = () => {
  const getCouponsFaqs = () => {
    return request({
      url: `/coupons`,
    });
  };

  const query = useQuery({
    queryFn: getCouponsFaqs,
    queryKey: ["get-coupons"],
  });

  return query;
};

export default useGetCoupon;
