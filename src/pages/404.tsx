import * as React from 'react'
import { Link } from 'gatsby'
import { BGWrap } from '../templates/Page'
import styled, { ThemeProvider } from 'styled-components'
import { websiteTheme } from '../assets/theme'
import { GlobalStyle } from '../assets/style'

// // styles
// const pageStyles = {
//   color: '#232129',
//   padding: '96px',
//   fontFamily: 'Mansalva, sans-serif',
//   backgroundSolor: '#95ffe9',
//   background: 'linear-gradient(101deg, #94ffea 0%, #62c5ba 41%, #217a7c 57%)',
//   background: `url(${MobileBackgroundImage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: '40% top',
// }
// const headingStyles = {
//   marginTop: 0,
//   marginBottom: 64,
//   maxWidth: 320,
// }

// const paragraphStyles = {
//   marginBottom: 48,
// }
// const codeStyles = {
//   color: '#8A6534',
//   padding: 4,
//   backgroundColor: '#FFF4DB',
//   fontSize: '1.25rem',
//   borderRadius: 4,
// }

// markup
const NotFoundPage = () => {
  return (
    <ThemeProvider theme={websiteTheme}>
      <GlobalStyle />
      <BGWrap>
        <Main>
          <title>Sivua ei löytynyt</title>
          <h1>
            <span role="img" aria-label="Pensive emoji">
              😔
            </span>{' '}
            Sivua ei löytynyt.
          </h1>
          <LinkButton to="/">Pääsivulle</LinkButton>
        </Main>
      </BGWrap>
    </ThemeProvider>
  )
}

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    margin-top: 0;
  }
`

const LinkButton = styled(Link)`
  background-color: #205855;
  padding: 20px 30px;
  border-radius: 4px;
  color: white;
  transition: background-color 250ms ease-in-out;

  &:hover {
    background-color: #063e3b;
    color: white;
  }
`

export default NotFoundPage
