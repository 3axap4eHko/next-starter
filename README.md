# Next Starter

NextJS GraphQL SSR starter

[![Github Build][github-image]][github-url]
[![Maintainability][codeclimate-maintainability-image]][codeclimate-maintainability-url]
[![Test Coverage][codeclimate-test_coverage-image]][codeclimate-test_coverage-url]

## SSR Render flow

1. `App:getInitialProps`, passing ctx to Page, props saved to `__NEXT_DATA__`
2. `Page:getInitialProps`, passing ctx to Doc
3. `App:render` by Apollo
4. `Page:render` by Apollo
5. `Document:getInitialProps`, renders App
6. `Page:render`
7. `App:render`
8. `Document:render`


[github-url]: https://github.com/3axap4eHko/next-starter/actions?query=workflow%3A%22Build+and+Publish%22
[github-image]: https://github.com/3axap4eHko/next-starter/workflows/Build%20and%20Publish/badge.svg

[codeclimate-maintainability-url]: https://codeclimate.com/repos/ID/maintainability
[codeclimate-maintainability-image]: https://api.codeclimate.com/v1/badges/ID/maintainability
[codeclimate-test_coverage-url]: https://codeclimate.com/repos/ID/test_coverage
[codeclimate-test_coverage-image]: https://api.codeclimate.com/v1/badges/ID/test_coverage
