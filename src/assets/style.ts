import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Neucha', sans-serif;
    font-size: 20px;
  }
  h1 {
    font-family: 'Mansalva', serif; 
  }
  h2 {
    font-family: 'Amatic SC', serif; 
  }
  h1 {
    font-size: 3em;
  }
  h2 {
    font-size: 2em;
  }
  a {
    color: inherit;
    text-decoration: none;
    transition: color 250ms ease-in-out;
  }
  a:hover,
  a:focus {
    color: #063e3b;
  }
`
