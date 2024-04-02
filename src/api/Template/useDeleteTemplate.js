import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
import { useNavigate, useParams } from "react-router";

const useDeleteTemplate = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { templateID } = useParams();
  const navigate = useNavigate();
  const deleteTemplateRequest = () => {
    return request({
      url: `/templates/${templateID}`,
      method: "delete",
    });
  };

  const mutation = useMutation({
    mutationFn: deleteTemplateRequest,
    mutationKey: [`delete-template`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-all-templates`]);
      enqueueSnackbar(data?.data?.message, { variant: "success" });
      navigate("/dashboard/templates");
    },
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    },
  });

  return mutation;
};

export default useDeleteTemplate;
