import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const backgroundBaseColor = '#f9f9f9';
const fontBaseColor = '#232b2b';

export default createGlobalStyle`
    ${reset};
    body {
        color: ${fontBaseColor};
        background-color: ${backgroundBaseColor};
        width : ${window.innerWidth};
        height : ${window.innerHeight};
    }
    * {
        box-sizing:border-box;
        user-select: none;
    }
    a {
        text-decoration: none;
    }
`;
