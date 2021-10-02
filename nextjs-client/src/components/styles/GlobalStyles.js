import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    html {
        font-size: 62.5%;
        font-family: Oxygen, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
    }

    body {
        box-sizing: border-box;
    }
`;

export default GlobalStyles;
