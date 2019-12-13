import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
    ${reset};
    body {
        background-color: #f9f9f9;
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
