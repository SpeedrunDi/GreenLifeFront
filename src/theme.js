import {createTheme} from "@mui/material";

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
                color: "success"
            },
        },
        MuiButton: {
            defaultProps: {
                color: "success"
            }
        }
    },
});

export default theme;