// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./routes";
// import { Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
// import LoadingBackdrop from "./components/Loader/LoaderBackdrop";

// ReactDOM.render(
//   <BrowserRouter>
//     <Suspense fallback={<LoadingBackdrop open={true} />}>
//       <App />
//     </Suspense>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import { Suspense } from "react";
// import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
// import App from "./routes";
// import LoadingBackdrop from "./components/Loader/LoaderBackdrop";
// import { ThemeContextProvider, useThemeContext } from "./theme/theme";

// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#dc004e",
//     },
//   },
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#90caf9",
//     },
//     secondary: {
//       main: "#f48fb1",
//     },
//   },
// });

// const { theme } = useThemeContext();
// console.log(' theme, toggleTheme', theme)

// ReactDOM.render(
//   <BrowserRouter>
//     <ThemeContextProvider>
//       <ThemeProvider theme={lightTheme}>
//         {" "}
//         <CssBaseline />
//         <Suspense fallback={<LoadingBackdrop open={true} />}>
//           <App />
//         </Suspense>
//       </ThemeProvider>
//     </ThemeContextProvider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./routes";
import LoadingBackdrop from "./components/Loader/LoaderBackdrop";
import { ThemeContextProvider, useThemeContext } from "./theme/theme";

// Define light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2B2B2B",
    },
    secondary: {
      main: "#808080",
    },
    accent: {
      main: "#46A1F5",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#161515",
    },
    secondary: {
      main: "#262525",
    },
  },
});

const Root = () => {
  const { theme } = useThemeContext();

  return (
    <BrowserRouter>
      {/* <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}> */}
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Suspense fallback={<LoadingBackdrop open={true} />}>
          <App />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <ThemeContextProvider>
    <Root />
  </ThemeContextProvider>,
  document.getElementById("root")
);
