import { Suspense } from 'react';
import { useThemeContext } from '@/utils/theme/theme';
import BackdropLoader from '@/components/theme/BackdropLoader';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Router from './routes/router';

// Define light and dark themes with custom properties
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2B2B2B',
      light: '#ffffff',
      dark: '#ECF1F0',
      contrastText: '#0FAE96',
      menuItemText: '#2B2B2B',
      borderColor: '#34313114',
      popoverText: '#000000',
      popoverBg: '#EFEFEF'
    },
    secondary: {
      main: '#808080',
      light: '#ECF1F0',
      dark: '#000000',
      subHeading: '#808080',
      link: '#46A1F5',
      wallet: '#2B2B2B',
      tborderColor: '#CBCBCB',
      trowbg: '#FFFFFF',
      trow2bg: '#F5F6F9'
    },
    accent: {
      main: '#46A1F5',
      lightGrey: '#CCCCCC',
      placeholder: '#C6C6C6',
      grey: '#EFEFEF'
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF',
      light: '#191919',
      dark: '#202020',
      contrastText: '#171717',
      menuItemText: '#0FAE96',
      borderColor: '#FFFFFF14',
      popoverText: '#FFFFFF',
      popoverBg: '#696969'
    },
    secondary: {
      main: '#ffffff',
      light: '#414141',
      dark: '#ffffff',
      subHeading: '#ECF1F0',
      link: '#ECF1F0',
      wallet: '#ECF1F0',
      tborderColor: '#9B9B9B',
      trowbg: '#242323',
      trow2bg: '#262525'
    },
    accent: {
      dark1: '#292929',
      dark2: '#3B3A3A',
      dark3: '#C6C6C6',
      dark4: '#191919'
    }
  }
});

const App = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Suspense fallback={<BackdropLoader open={true} />}>
        <Router />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
