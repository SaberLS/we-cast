import { createTheme } from "@mui/material";

// A custom theme for this app
export const theme = createTheme({
    palette: {
        primary: {
            main: '#8cbf70',
            contrastText: '#000',
            light: '#acd099',
            dark: '#498520',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        text: {
            primary: "#fff",
        },
        background: {
            default: "#282c34",
        }
    }
});