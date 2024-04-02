import { useSnackbar } from 'notistack';
const useOnSuccess = () => {
    const { enqueueSnackbar } = useSnackbar();
    const successHandeler = (data , additionalLogic = null) => {
        if(data?.data?.data?.message){
            enqueueSnackbar("welcome back admin", {variant : 'success'})
        }
        if(additionalLogic){
            additionalLogic()
        }
    }

    return {
        successHandeler
    }
}

export default useOnSuccess