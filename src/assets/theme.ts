export const websiteTheme = {
  breakpoints: {
    smallMobileBreakpoint: 414,
    mobileBreakpoint: 701,
    tabletBreakpoint: 1001,
  },
}

declare module 'styled-components' {
  type Theme = typeof websiteTheme
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
