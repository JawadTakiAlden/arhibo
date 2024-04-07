import { useCallback } from "react";
import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const useShowCoupon = () => {
  const { couponID } = useParams();
  const showCouponRequest = useCallback(() => {
    return request({
      url: `/coupon/${couponID}`,
    });
  });

  const query = useQuery({
    queryFn: showCouponRequest,
    queryKey: [`show-coupon-${couponID}`],
  });

  return query;
};

export default useShowCoupon;
