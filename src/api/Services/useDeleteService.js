import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router";
import { request } from "../request";
const useDeleteService = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const {serviceID} = useParams()
  const navigate = useNavigate()
  const deleteServiceRequest = () => {
    return request({
      url: `/services/${serviceID}`,
      method: "delete",
    });
  };

  const mutation = useMutation({
    mutationFn: deleteServiceRequest,
    mutationKey: [`delete-service`],
    onSuccess: (data) => {
      queryClient.refetchQueries(["get-all-service"]);
      enqueueSnackbar(data?.data?.message, { variant: "success" });
      navigate('/dashboard/services')
    },
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    },
  });

  return mutation;
};

export default useDeleteService;
