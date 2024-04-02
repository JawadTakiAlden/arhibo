import { useSnackbar } from 'notistack';


const useOnError = () => {
    const { enqueueSnackbar } = useSnackbar();
    const errorHandeler = (error , additionalLogic = null) => {
        if(error.response){
            enqueueSnackbar(error?.response?.data?.error , {variant : 'error'})
        }
        if(additionalLogic){
            additionalLogic()
        }
    }

    return {
        errorHandeler
    }
}

export default useOnError