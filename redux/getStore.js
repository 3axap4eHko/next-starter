import createStore from './createStore';

let instance = null;

export default function (state) {
  if (!process.browser) {
    if (state && state.__get) {
      console.log('Store reused');
      return state.__get();
    }
    state ? console.log('Store restored') : console.log('Store created');
    return createStore(state);
  }
  if (!instance) {
    console.log('Store hydrated');
    instance = createStore(state);
  }
  console.log('Store reused');
  return instance;
}