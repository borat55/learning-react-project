import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import { ThemeProvider } from "styled-components";
// import App from "./App";
// import { darkTheme, lightTheme } from "./theme";

// ReactDOM.render(
//   <React.StrictMode>
//     <ThemeProvider theme={lightTheme}>
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
