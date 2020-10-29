import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import brown from '@material-ui/core/colors/brown';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: amber,
        accent: {...brown, 
            main: brown[500],
        },
        text: {
            primary: '#424242',
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans TC"',
            '"Noto Sans CJK TC"',
            '"LiHei Pro"',
            '"Heiti TC"',
            '"Microsoft JhengHei"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        h3: {
            fontWeight: '500'
        },
        h4: {
            marginTop: '40px',
            marginBottom: '16px',
            fontWeight: '500'
        },
    },
});

export default theme