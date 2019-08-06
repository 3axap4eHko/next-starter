# Next Starter

NextJS GraphQL JSS SSR starter

## SSR Render flow

1. App:getInitialProps, passing ctx to Page, props saved to __NEXT_DATA__
2. Page:getInitialProps, passing ctx to Doc
3. App:render by Apollo
4. Page:render by Apollo
5. Document:getInitialProps, renders App
6. Page:render
7. App:render
8. Document:render
