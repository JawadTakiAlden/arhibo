import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
const useCreateCoupon = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const createCouponRequest = (data) => {
    return request({
      url: `/coupons`,
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: createCouponRequest,
    mutationKey: [`create-coupon`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-coupons`]);
      enqueueSnackbar(data?.data?.message, { variant: "success" });
    },
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    },
  });

  return mutation;
};

export default useCreateCoupon;
