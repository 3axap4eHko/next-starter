import iterateHOC from '../utils/iterateHOC';

export default async function (Component, ...args) {
  if (Component.getInitialProps) {
    return Component.getInitialProps(...args);
  }
  const hocIterator = iterateHOC(Component);
  let hoc = hocIterator.next();
  while (!hoc.done) {
    if (hoc.value.getInitialProps) {
      return hoc.value.getInitialProps(...args);
    }
    hoc = hocIterator.next();
  }
  return {};
}
