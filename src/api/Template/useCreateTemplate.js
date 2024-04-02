import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "../request";

const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const createTemplateRequest = (data) => {
    return request({
      url: `/templates`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: createTemplateRequest,
    mutationKey: [`create-template`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`get-all-templates`]);
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

export default useCreateTemplate;
