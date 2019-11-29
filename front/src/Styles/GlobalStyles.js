import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
    ${reset};
    * {
        box-sizing:border-box;
        user-select: none;
    }
    a {
        text-decoration: none;
    }
`;
