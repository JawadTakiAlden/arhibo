import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";

const useDeleteOffer = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const deleteOfferRequest = (id) => {
    return request({
      url: `/offers/${id}`,
      method: "delete",
    });
  };

  const mutation = useMutation({
    mutationFn: deleteOfferRequest,
    mutationKey: [`delete-faq`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-all-offers`]);
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

export default useDeleteOffer;
