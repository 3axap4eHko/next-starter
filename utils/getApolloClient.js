import createApolloClient from './createApolloClient';

let instance = null;

export default function (state) {
  if (!process.browser) {
    if (state && state.__get) {
      console.log('client state reused');
      return state.__get();
    }
    state ? console.log('Client restored') : console.log('Client created');
    return createApolloClient(state);
  }
  if (!instance) {
    console.log('Client hydrated');
    instance = createApolloClient(state);
  }
  console.log('Client reused');
  return instance;
}