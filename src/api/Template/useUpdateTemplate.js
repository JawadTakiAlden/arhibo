import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";
import { useParams } from "react-router";
const useUpdateTemplate = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { templateID } = useParams();
  const updateTemplateRequest = (data) => {
    return request({
      url: `/templates/${templateID}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: updateTemplateRequest,
    mutationKey: [`update-template`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`show-templates-${templateID}`]);
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

export default useUpdateTemplate;
