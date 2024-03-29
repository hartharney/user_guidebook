import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        box-sizing: border-box;
    }

    body {
        font-family: lato, inter, 'Roboto', sans-serif;
        letter-spacing: .6px;
    }
`;
