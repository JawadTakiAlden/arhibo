import { Button as MuiButton, styled } from "@mui/material";

const Button = styled(MuiButton)(({theme}) => ({
    backgroundColor : theme.palette.darkBlue.main,
    color : theme.palette.getContrastText(theme.palette.darkBlue.main),
    textTransform : 'capitalize',
    height : '50px',
    padding : '8px 12px 8px 18px',
    "&:hover" : {
        backgroundColor : theme.palette.darkBlue.dark,
        color : theme.palette.getContrastText(theme.palette.darkBlue.dark),
    }
}));

export default Button
